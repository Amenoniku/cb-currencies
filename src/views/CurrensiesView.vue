<template>
  <div>
    <h1 class="green">Валюты</h1>
    <v-select
      v-model="selectedCurrency"
      :options="sortedCurrencies"
      label="Name"
    />
    <ul>
      <li v-for="currency in sortedCurrencies" :key="currency.ID">
        <span class="green">{{ currency.Name }}</span> -
        {{
          moneyFormat({
            value: getCurrencyValue(currency),
            charCode: selectedCurrency.CharCode,
          })
        }}
        <span
          :class="{
            green: getIsAppreciationDepreciation(currency) === '↑',
            red: getIsAppreciationDepreciation(currency) === '↓',
          }"
        >
          {{ getIsAppreciationDepreciation(currency) }}</span
        >, <span class="green">Номинал: </span>{{ currency.Nominal }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";

import { useCurrenciesStore } from "../stores/currencies";
import { moneyFormat } from "../utils";
import type { Currency } from "../models/Currencies.model";

const store = useCurrenciesStore();
const sortedCurrencies = computed(() => store.sortedCurrencies);

const selectedCurrency = ref<Currency>({} as Currency);

const { fetchCurrencies } = store;

const getCurrencyValue = (currency: Currency): number => {
  return Object.keys(selectedCurrency.value).length
    ? (1 / currency.Value) * selectedCurrency.value.Value
    : currency.Value;
};

const getCurrencyPrevious = (currency: Currency): number => {
  return Object.keys(selectedCurrency.value).length
    ? (1 / currency.Previous) * selectedCurrency.value.Previous
    : currency.Previous;
};

type CurrencyStatus = "↑" | " " | "↓";
const getIsAppreciationDepreciation = (currency: Currency): CurrencyStatus => {
  let status: CurrencyStatus = " ";
  if (getCurrencyValue(currency) > getCurrencyPrevious(currency)) status = "↑";
  else if (getCurrencyValue(currency) < getCurrencyPrevious(currency))
    status = "↓";
  return status;
};
onMounted(fetchCurrencies);
</script>

<style scoped>
h1 {
  text-align: center;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: 1.3em;
}
li {
  padding: 6px;
  /* border-bottom: 1px solid var(--color-text); */
}
</style>
