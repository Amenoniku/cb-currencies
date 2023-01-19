export const moneyFormat = ({
  value,
  charCode = "RUB",
}: {
  value: number;
  charCode?: string;
}): string =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: charCode,
  }).format(value);
