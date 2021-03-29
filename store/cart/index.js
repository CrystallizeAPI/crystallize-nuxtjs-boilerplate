/*
 * All the status the cart can have.
 */
const CART_STATUS = {
  NOT_HYDRATED: 'not-hydrated',
  HYDRATE: 'hydrate',
  READY: 'ready',
  SERVER_BASKET_IS_STALE: 'server-basket-is-stale'
}

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
    cart: [],
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

export const actions = {
  addItem(context, payload) {
    console.log('added item')
    console.log(context, payload)
  }
}

