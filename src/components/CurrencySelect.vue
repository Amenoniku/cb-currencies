<template>
  <div>
    <select v-model="selectedCurrency">
      <option value="" disabled selected>Выберите валюту</option>
      <option
        v-for="currency in currencies"
        :key="currency.ID"
        :value="currency"
      >
        {{ currency.Name }}
      </option>
    </select>
    <input type="number" v-model.number="amount" />

    <div class="result">
      <label class="green">Конвертация: </label>
      <span>{{ conversionRate }}</span>
    </div>
    <div v-if="isCurrencyChosen">
      <label class="green">Курс: </label>
      <span>{{ moneyFormat({ value: selectedCurrency.Value }) }}</span>
      <br />
      <label class="green">Номинал: </label>
      <span>{{
        moneyFormat({
          value: selectedCurrency.Nominal,
          charCode: selectedCurrency.CharCode,
        })
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { moneyFormat } from "../utils";
import type { Currency } from "../models/Currencies.model";

const props = defineProps<{
  currencies: Currency[];
}>();

const selectedCurrency = ref<Currency>({} as Currency);
const amount = ref<number>(1);

const isCurrencyChosen = computed(
  (): boolean => !!Object.keys(selectedCurrency.value).length
);
const conversionRate = computed((): string =>
  isCurrencyChosen.value
    ? moneyFormat({
        value:
          amount.value *
          (selectedCurrency.value.Value / selectedCurrency.value.Nominal),
      })
    : "Выберите валюту для конвертации в рубли"
);
</script>

<style scoped>
select,
input {
  padding: 0.4em;
  margin: 0.4em;
  font-size: 1em;
  border-radius: 3px;
  border: 1px solid #ccc;
}
select {
  width: auto;
}
input {
  width: 100px;
}
.result {
  font-size: 2em;
  margin: 1em 0;
  font-weight: bold;
}
</style>
