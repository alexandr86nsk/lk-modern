export const currencyFormatter = (currency?: string) => {
  if (currency) {
    return `${currency.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}`;
  }
  return currency;
};
