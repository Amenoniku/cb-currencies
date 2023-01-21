<template>
  <div class="block">
    <input
      :value="amount"
      type="number"
      :disabled="inputDisabled"
      @input="emit('changeAmout', $event.target.value)"
    />
    <v-select
      placeholder="RUB"
      :modelValue="currency"
      :options="exchangeRatesArray"
      label="CharCode"
      :clearable="false"
      @update:modelValue="emit('updateCurrency', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Currency } from "../models/Currencies.model";
type Booleanish = boolean | "true" | "false";
interface Props {
  exchangeRatesArray: Currency[];
  inputDisabled?: Booleanish;
  amount: number | string;
  currency: Currency;
}

const props = withDefaults(defineProps<Props>(), {
  inputDisabled: false,
});

const emit = defineEmits<{
  (e: "changeAmout", value: number): number;
  (e: "updateCurrency", currency: Currency): Currency;
}>();
</script>

<style scoped>
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
  width: 150px;
}
</style>
