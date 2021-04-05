const PRICE_NOT_AVAILABLE = "N/A"
const HAS_NO_DISCOUNT = 0

export function getRelativePriceVariants({ variant, locale }) {
  const defaultPrice =
    variant?.priceVariants?.find(
      (pv) => pv.identifier === locale.crystallizePriceVariant
    ) || {};

  // Get price variant with identifier "sales" from Crystallize
  const discountPrice =
    variant?.priceVariants?.find((pv) => pv.identifier === 'sales') || null;

  const discountPercentage = (100 * discountPrice?.price) / defaultPrice?.price;

  return {
    defaultPrice: defaultPrice || PRICE_NOT_AVAILABLE,
    discountPrice: discountPrice || null,
    discountPercentage: calculatePercentageDiscount(discountPercentage)
  };
}

function calculatePercentageDiscount(discountPercentage) {
  return isNaN(discountPercentage)
    ? HAS_NO_DISCOUNT
    : 100 - Math.round(discountPercentage)
}

/**
 * The Intl.NumberFormat object enables language-sensitive number formatting.
 * Ex: locale = 'en-US'
 */
export function formatCurrency({ amount, currency, locale }) {
  if (currency === 'N/A') {
    const SYSTEM_CURRENCY = "EUR"
    return new Intl.NumberFormat(locale, {
      style: 'currency', currency: SYSTEM_CURRENCY
    }).format(amount);
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    amount
  );
}
