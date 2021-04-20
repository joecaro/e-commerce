export default function formatMoney(amount = 0, currency = "USD") {
  const options = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  };

  // check if whole dollar amount

  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat("en-US", options);

  return formatter.format(amount / 100);
}
