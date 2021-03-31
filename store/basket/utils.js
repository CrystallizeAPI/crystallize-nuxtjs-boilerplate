export function isVoucherProduct(product) {
  return product.sku.startsWith('--voucher--')
}

/* 
 * We add to the non-voucher products the quantity (from the client-side state).
 */
export function withLocalState(cart, item) {
  // Exclude voucher codes
  if (isVoucherProduct(item)) {
    return item;
  }

  const clientBasketCartItem = cart.find(
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

export function getTotalItemsWithoutDiscount(cart) {
  const totalItemsWithoutDiscount = cart
    .map(cartItem => withLocalState(cart, cartItem))
    .filter(Boolean)
    .filter((p) => !isVoucherProduct(p))
    .reduce(
      (acc, curr) => {
        return {
          gross: acc.gross + curr.price.gross,
          net: acc.net + curr.price.net,
          quantity: acc.quantity + curr.quantity,
        };
      },
      {
        gross: 0,
        quantity: 0,
      }
    ).quantity;

  return totalItemsWithoutDiscount || 0;
}
