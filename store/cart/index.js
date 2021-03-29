/*
 * All the status the cart can have.
 */
const CART_STATUS = {
  NOT_HYDRATED: 'not-hydrated',
  HYDRATE: 'hydrate',
  READY: 'ready',
  SERVER_BASKET_IS_STALE: 'server-basket-is-stale'
}

const EMPTY_CART = []

export const initialState = {
  status: CART_STATUS.NOT_HYDRATED,
  /**
   * A simplistic basket which gets stored on client side
   */
  clientBasket: {
    /**
     * Each client cart item consists of these fields:
     *  - sku
     *  - path
     *  - priceVariantIdentifier
     *  - quantity
     */
    cart: EMPTY_CART,
    voucherCode: null,

    /**
     * In some cases we create an order in Crystallize before
     * the checkout is completed. Currently, this is done for
     * Klarna and Vipps payments
     */
    crystallizeOrderId: null,

    /**
     * Track unfinished Klarna order
     * Only used if you're doing Klarna payments
     */
    klarnaOrderId: null
  },

  // The validated basket sent back from the Service API
  serverBasket: null,

  // The basket cart item to draw attention to
  attentionCartItem: {}
};

export const state = () => initialState

export const getters = {
  totalWithoutDiscounts: (state) => {
    const cart = (state.serverBasket?.cart || EMPTY_CART)
      .map(withLocalState)
      .filter(Boolean);

    return cart
      .filter(p => !isVoucherProduct(p))
      .reduce(
        (acc, curr) => {
          return {
            gross: acc.gross + curr.price.gross,
            net: acc.net + curr.price.net,
            quantity: acc.quantity + curr.quantity
          };
        },
        {
          gross: 0,
          quantity: 0
        }
      );
  },
}

function isVoucherProduct(product) {
  return product.sku.startsWith('--voucher--')
}

/* 
 * We add to the non-voucher products the quantity (from the client-side state).
 */
function withLocalState(item) {
  // Exclude voucher codes
  if (isVoucherProduct(item)) {
    return item;
  }

  const clientBasketCartItem = clientBasket.cart.find(
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

export const actions = {
  addItem(context, payload) {
    console.log('added item')
    console.log(context, payload)
  }
}

