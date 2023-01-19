<template>
  <CurrencySelect :currencies="sortedCurrencies" />
  <CurrencySelect :currencies="sortedCurrencies" />
</template>
<script setup lang="ts">
import { onMounted, computed } from "vue";

import CurrencySelect from "../components/CurrencySelect.vue";
import { useCurrenciesStore } from "../stores/currencies";

const store = useCurrenciesStore();
const sortedCurrencies = computed(() => store.sortedCurrencies);
const { fetchCurrencies } = store;

onMounted(fetchCurrencies);
</script>

<style scoped></style>
