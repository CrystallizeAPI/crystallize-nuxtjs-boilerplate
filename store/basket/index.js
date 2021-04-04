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

const BASKET_INITIAL_STATE = {
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
}

export const state = () => BASKET_INITIAL_STATE;

/**
 * Getters are used to avoid logic duplication that depends on the state
 * FYI: https://vuex.vuejs.org/guide/getters.html
 */
export const getters = {
  totalItemsWithoutDiscount: (state) => {
    const cart = (state.serverBasket?.cart || EMPTY_CART)
      .map(cartItem => withLocalState(state.clientBasket.cart, cartItem))
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

/**
 * Vue's and Vuex's reactivity system relies on observing mutations to objects and arrays.
 */
export const mutations = {
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

  setServerBasket(state, { serverBasket }) {
    state.serverBasket = serverBasket
  },
  updateBasketFromCache(state, { clientBasketCached }) {
    if (clientBasketCached.cart) {
      state.clientBasket = clientBasketCached || BASKET_INITIAL_STATE

      if (!state.clientBasket.cart) {
        state.clientBasket.cart = BASKET_INITIAL_STATE.clientBasket.cart
      }
    }

    state.status = BASKET_STATUS.SERVER_BASKET_IS_STALE
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
  context.dispatch('updateServerBasket')
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
  async loadBasket(context) {
    const { state, commit } = context
    if (state.status === BASKET_STATUS.NOT_HYDRATED) {
      const clientBasketCached = await retrieveFromCache();
      commit('updateBasketFromCache', { clientBasketCached })
    }
  },
  updateServerBasket(context) {
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
  },
}

