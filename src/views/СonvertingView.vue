<template>
  <CurrenciesExchanger :currencies="sortedCurrencies" />
</template>
<script setup lang="ts">
import { onMounted, computed } from "vue";

import CurrenciesExchanger from "../components/CurrenciesExchanger.vue";
import { useCurrenciesStore } from "../stores/currencies";

const store = useCurrenciesStore();
const sortedCurrencies = computed(() => store.sortedCurrencies);
const { fetchCurrencies } = store;
onMounted(async () => {
  await fetchCurrencies();
});
</script>

<style scoped></style>
