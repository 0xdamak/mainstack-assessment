export function formatToUSD(number = 0): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
  });
  return formatter.format(number);
}
