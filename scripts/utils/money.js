function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;
// default exports allow to import without curly braces
// only one default export per file is available