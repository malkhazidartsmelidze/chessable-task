/**
 * Create new INTL Formatter for currrencies
 * @example 10000 > $10,000.00
 */
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * Format Currency
 * @example 10000 > $10,000.00
 * @param {Number} number
 */
const formatCurrency = (number) => {
  return currencyFormatter.format(number);
};

export default formatCurrency;
