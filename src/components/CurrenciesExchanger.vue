<template>
  <div class="container">
    <h1 class="green">Конвертер</h1>
    <CurrencySelect
      :amount="baseCurrencyAmount"
      :currency="baseCurrency"
      :exchangeRatesArray="currencies"
      @change-amout="baseCurrencyAmount = $event"
      @updateCurrency="baseCurrency = $event"
    />
    <button @click="inputChange">Поменять местами</button>
    <CurrencySelect
      :amount="convertedCurrencyAmount"
      :currency="convertedCurrency"
      :exchangeRatesArray="currencies"
      inputDisabled="true"
      @updateCurrency="convertedCurrency = $event"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";

import CurrencySelect from "./CurrencySelect.vue";

import type { Currency } from "../models/Currencies.model";

const props = defineProps<{
  currencies: Currency[];
}>();

const baseCurrency = ref<Currency>({} as Currency);
const baseCurrencyAmount = ref(1);

const convertedCurrency = ref<Currency>({} as Currency);
const convertedCurrencyAmount = computed<string>(() =>
  (
    baseCurrencyAmount.value *
    (baseCurrency.value.Value / convertedCurrency.value.Value)
  ).toFixed(2)
);

const inputChange = (): void => {
  baseCurrencyAmount.value = Number(convertedCurrencyAmount.value);
  const savedBaseCurrency = baseCurrency.value;
  baseCurrency.value = convertedCurrency.value;
  convertedCurrency.value = savedBaseCurrency;
};
watch(
  () => props.currencies,
  (currs) => {
    if (currs.length) {
      baseCurrency.value = currs.find((c) => c.CharCode === "RUB") as Currency;
      convertedCurrency.value = currs.find(
        (c) => c.CharCode === "USD"
      ) as Currency;
    }
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
