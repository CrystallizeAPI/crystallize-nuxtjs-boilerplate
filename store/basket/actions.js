import { serviceApi } from '/lib/service-api'
import { BASKET_STATUS } from './state'
import { retrieveFromCache, persistToCache } from './cache';
import { GET_SERVER_BASKET_QUERY } from './get-basket-query';
import { clientCartItemForAPI } from './utils'

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

export default {
  loadBasket(context) {
    const { state, commit } = context
    if (state.status === BASKET_STATUS.NOT_HYDRATED) {
      retrieveFromCache().then(clientBasketCached => {
        commit('updateBasketFromCache', { clientBasketCached })
      });
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

  drawAttentionToItem(context, { sku }) {
    context.commit('draAttentionToItem', { sku })
    /**
     * If we're using Vuex modules feature, to dispatch actions from another module
     * we need to provide a configuration with a root:true flag.
     * 
     * FYI: https://vuex.vuejs.org/guide/modules.html#namespacing
     */
    const configToDispatchActionsFromAnotherModule = { root: true }
    context.dispatch("layout/showAside", {}, configToDispatchActionsFromAnotherModule);
  }
}