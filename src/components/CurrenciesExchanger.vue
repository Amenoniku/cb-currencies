<template>
  <div class="container">
    <h1 class="green">Конвертер</h1>
    <CurrencySelect
      :amount="baseCurrencyAmount"
      :currency="baseCurrency"
      :exchangeRatesArray="exchangeRatesArray"
      @change-amout="baseCurrencyAmount = $event"
      @updateCurrency="baseCurrency = $event"
    />
    <button @click="inputChange">Поменять местами</button>
    <CurrencySelect
      :amount="convertedCurrencyAmount"
      :currency="convertedCurrency"
      :exchangeRatesArray="exchangeRatesArray"
      inputDisabled="true"
      @change-amout="convertedCurrencyAmount = $event"
      @updateCurrency="convertedCurrency = $event"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";

import CurrencySelect from "./CurrencySelect.vue";

import type {
  Currency,
  ExchangeRate,
  ExchangeRates,
} from "../models/Currencies.model";

const props = defineProps<{
  currencies: Currency[];
}>();

const exchangeRates = computed<ExchangeRates>(() => {
  let rates: ExchangeRates = { RUB: 1 };
  props.currencies.forEach(
    (currency: Currency) =>
      (rates[currency.CharCode] = currency.Value / currency.Nominal)
  );
  return rates;
});

const exchangeRatesArray = computed<ExchangeRate[]>(() =>
  Object.keys(exchangeRates.value).map((key) => ({
    charCode: key,
    value: exchangeRates.value[key],
  }))
);
const baseCurrency = ref<ExchangeRate>({
  charCode: "RUB",
  value: 1,
});
const baseCurrencyAmount = ref(1);

const convertedCurrency = ref<ExchangeRate>({
  charCode: "USD",
  value: 1,
});
const convertedCurrencyAmount = computed<string | number>(() =>
  (
    baseCurrencyAmount.value *
    (exchangeRates.value[baseCurrency.value.charCode] /
      exchangeRates.value[convertedCurrency.value.charCode])
  ).toFixed(2)
);

const inputChange = (): void => {
  baseCurrencyAmount.value = Number(convertedCurrencyAmount.value);
  const { charCode: baseCharCode, value: baseValue } = baseCurrency.value;
  baseCurrency.value.charCode = convertedCurrency.value.charCode;
  baseCurrency.value.value = convertedCurrency.value.value;
  convertedCurrency.value.charCode = baseCharCode;
  convertedCurrency.value.value = baseValue;
};
watch(
  () => props.currencies,
  (currs) => {
    if (currs)
      convertedCurrency.value.value =
        exchangeRates.value[convertedCurrency.value.charCode];
  },
  { immediate: true }
);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.block {
  display: flex;
  align-items: center;
  margin: 10px;
}

.block input {
  margin-right: 10px;
  background-color: transparent;
  color: var(--color-text-green);
  border: var(--vs-border-width) var(--vs-border-style) var(--vs-border-color);
  border-radius: var(--vs-border-radius);
  padding: 9px 8px 6px 9px;
  white-space: normal;
  box-sizing: border-box;
}

.block .v-select {
  width: 110px;
}
</style>
