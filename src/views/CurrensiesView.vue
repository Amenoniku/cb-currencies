<template>
  <div>
    <h1 class="green">Валюты</h1>
    <ul>
      <li v-for="currency in sortedCurrencies" :key="currency.ID">
        <span class="green">{{ currency.Name }}</span> -
        {{ moneyFormat({ value: currency.Value }) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";

import { useCurrenciesStore } from "../stores/currencies";
import { moneyFormat } from "../utils";

const store = useCurrenciesStore();
const sortedCurrencies = computed(() => store.sortedCurrencies);
const { fetchCurrencies } = store;

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
