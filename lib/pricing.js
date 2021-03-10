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