import { BASKET_INITIAL_STATE, BASKET_STATUS } from './state'
/**
 * Vue's and Vuex's reactivity system relies on observing mutations to objects and arrays.
 */
export default {
  updateBasketFromCache(state, { clientBasketCached }) {
    if (clientBasketCached.cart) {
      state.clientBasket = clientBasketCached || BASKET_INITIAL_STATE

      if (!state.clientBasket.cart) {
        state.clientBasket.cart = BASKET_INITIAL_STATE.clientBasket.cart
      }
    }

    state.status = BASKET_STATUS.SERVER_BASKET_IS_STALE
  },

  setServerBasket(state, { serverBasket }) {
    state.serverBasket = serverBasket
    state.status = BASKET_STATUS.READY
  },

  actionOnCartItem(state, { action, product }) {
    const { sku, path } = product
    if (!sku || !path) {
      throw new Error(`Please provide "sku" and "path" for ${action}`);
    }

    const itemIndex = state.clientBasket.cart.findIndex((i) => i.sku === sku);
    const isItemAlreadyInCart = itemIndex !== -1
    const hasToDecrementOrRemoveItem = ['remove-item', 'decrement-item'].includes(action)

    if (!isItemAlreadyInCart) {
      if (!hasToDecrementOrRemoveItem) {
        state.clientBasket.cart.push({
          sku,
          path,
          priceVariantIdentifier: product.priceVariantIdentifier || 'default',
          quantity: 1
        });
        state.status = BASKET_STATUS.SERVER_BASKET_IS_STALE;
        return
      }
    }

    /**
     * At this point, we know already that the item is in the cart.
     */
    if (action === 'increment-item' || action === 'add-item') {
      state.clientBasket.cart[itemIndex].quantity += 1;
    }

    const hasOnlyOneItemOfTypeInCart = state.clientBasket.cart[itemIndex].quantity === 1
    /**
     * We remove the item from the cart if:
     * - The action is "remove-item"
     * - The action is "derement-item" but the quantity equals 1.
     */
    if (action === 'remove-item' || (action === 'decrement-item' && hasOnlyOneItemOfTypeInCart)) {
      state.clientBasket.cart.splice(itemIndex, 1);
    } else if (action === 'decrement-item') {
      state.clientBasket.cart[itemIndex].quantity -= 1;
    }

    state.status = BASKET_STATUS.SERVER_BASKET_IS_STALE;
  },

  draAttentionToItem(state, { sku }) {
    state.attentionCartItem = { time: Date.now(), sku };
  }
}



