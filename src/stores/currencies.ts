// in a file named `plugins/currencies.ts`
import axios from "axios";
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Currency, Valute, CBR } from "../models/Currencies.model";

export const useCurrenciesStore = defineStore("currencies", () => {
  const currencies = ref<Valute>({});
  const fetchCurrencies = async () => {
    const response = await axios.get<CBR>(
      "https://www.cbr-xml-daily.ru/daily_json.js"
    );
    currencies.value = response.data.Valute;
    currencies.value["RUB"] = {
      ID: "000000",
      NumCode: "000",
      CharCode: "RUB",
      Nominal: 1,
      Name: "Росийский рубль",
      Value: 1,
      Previous: 1,
    };
  };
  const sortedCurrencies = computed(() => {
    return Object.values(currencies.value).sort(
      (a: Currency, b: Currency) => a.Value / a.Nominal - b.Value / b.Nominal
    );
  });
  return {
    fetchCurrencies,
    sortedCurrencies,
  };
});
