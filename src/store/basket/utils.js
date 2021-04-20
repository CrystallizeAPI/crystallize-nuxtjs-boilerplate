export function isVoucherProduct(product) {
  return product.sku.startsWith('--voucher--')
}

/* 
 * We add to the non-voucher products the quantity (from the client-side state).
 */
export function withLocalState(localCart, item) {
  // Exclude voucher codes
  if (isVoucherProduct(item)) {
    return item;
  }

  const clientBasketCartItem = localCart.find(
    (c) => c.sku === item.sku
  );

  /**
   * Don't show the cart item if it is not in
   * the client cache.
   **/
  if (!clientBasketCartItem) {
    return null;
  }

  return {
    ...item,
    quantity: clientBasketCartItem.quantity
  };
}

export function clientCartItemForAPI({ sku, path, quantity, priceVariantIdentifier }) {
  return { sku, path, quantity, priceVariantIdentifier };
}
