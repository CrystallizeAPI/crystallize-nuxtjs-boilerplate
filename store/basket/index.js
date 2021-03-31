import { isVoucherProduct, withLocalState, clientCartItemForAPI } from './utils'
import { retrieveFromCache, persistToCache } from './cache';
import { serviceApi } from '/lib/service-api'
import { GET_SERVER_BASKET_QUERY } from './get-basket-query';

/*
 * All the status the cart can have.
 */
const BASKET_STATUS = {
  NOT_HYDRATED: 'not-hydrated',
  HYDRATE: 'hydrate',
  READY: 'ready',
  SERVER_BASKET_IS_STALE: 'server-basket-is-stale'
}

const EMPTY_CART = []

export const state = () => ({
  status: BASKET_STATUS.NOT_HYDRATED,
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
});

/**
 * Getters are used to avoid logic duplication that depends on the state
 * FYI: https://vuex.vuejs.org/guide/getters.html
 */
export const getters = {
  totalItemsWithoutDiscount: (state) => {
    const serverCart = state.serverBasket?.cart || EMPTY_CART
    const cart = serverCart
      .map(cartItem => withLocalState(serverCart, cartItem))
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
  clientCart: (state) => {
    return state.clientBasket.cart.map(clientCartItemForAPI)
  },
  basketModel: (state, getters) => locale => {
    return {
      locale,
      cart: getters.clientCart,
      crystallizeOrderId: state.clientBasket.crystallizeOrderId,
      klarnaOrderId: state.clientBasket.klarnaOrderId,
    };
  }
}

export const mutations = {
  actionOnCartItem(state, { action, product }) {
    /**
     * For inmutability purposes, we will modify a copy of the current state.
     * Once we've finished, we'll assign this draft state to the original.
     */
    const currentState = { ...state }

    const { sku, path } = product
    if (!sku || !path) {
      throw new Error(`Please provide "sku" and "path" for ${action}`);
    }

    const itemIndex = currentState.clientBasket.cart.findIndex((i) => i.sku === sku);
    const isItemAlreadyInCart = itemIndex !== -1
    const hasToDecrementOrRemoveItem = !['remove-item', 'decrement-item'].includes(action)

    if (!isItemAlreadyInCart) {
      if (hasToDecrementOrRemoveItem) {
        currentState.clientBasket.cart.push({
          sku,
          path,
          priceVariantIdentifier: product.priceVariantIdentifier || 'default',
          quantity: 1
        });
        currentState.status = 'server-basket-is-stale';
        return
      }
    }

    /**
     * At this point, we know already that the item is not in the cart.
     */
    if (action === 'remove-item') {
      currentState.clientBasket.cart.splice(itemIndex, 1);
    }
    if (action === 'decrement-item') {
      currentState.clientBasket.cart[itemIndex].quantity -= 1;
    }
    if (action === 'increment-item' || action === 'add-item') {
      currentState.clientBasket.cart[itemIndex].quantity += 1;
    }

    currentState.status = 'server-basket-is-stale';
    state = currentState
  },

  setServerBasket(state, { serverBasket }) {
    state.serverBasket = serverBasket
  }
}

/**
 * Some actions require side-effects like persist
 * to cache, update the basket, etc.
 */
const actionWithSideEffect = fn => (context, payload) => {
  fn(context, payload)
  persistToCache({
    ...context.state.clientBasket,
    cart: context.state.clientBasket.cart.map(clientCartItemForAPI)
  });
  context.dispatch('updateBasket')
}

export const actions = {
  addItem: actionWithSideEffect((context, product) => {
    context.commit('actionOnCartItem', { action: 'add-item', product });
  }),
  removeItem: actionWithSideEffect((context, product) => {
    context.commit('actionOnCartItem', { action: 'remove-item', product });
  }),
  incrementItem: actionWithSideEffect((context, product) => {
    context.commit('actionOnCartItem', { action: 'increment-item', product });
  }),
  decrementItem: actionWithSideEffect((context, product) => {
    context.commit('actionOnCartItem', { action: 'decrement-item', product });
  }),
  updateBasket(context) {
    const { locales, locale: localeCode } = this.$i18n;
    const locale = locales.find((l) => l.locale === localeCode) || locales[0];
    const { iso, file, code, ...localeForBasketModel } = locale;

    const basketModel = context.getters.basketModel(localeForBasketModel)

    serviceApi({
      query: GET_SERVER_BASKET_QUERY,
      variables: { basketModel }
    }).then(({ data }) => {
      if (data) {
        context.commit('setServerBasket', { serverBasket: data.basket })
      }
    })
  }
}

