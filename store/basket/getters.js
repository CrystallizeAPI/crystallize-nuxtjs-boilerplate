import { isVoucherProduct, withLocalState, clientCartItemForAPI } from './utils'


/**
 * Getters are used to avoid logic duplication that depends on the state
 * FYI: https://vuex.vuejs.org/guide/getters.html
 */
export default {
  totalItemsWithoutDiscount: (state) => {
    const cart = (state.serverBasket?.cart || [])
      .map(cartItem => withLocalState(state.clientBasket.cart, cartItem))
      .filter(Boolean);

    return cart
      .filter(p => !isVoucherProduct(p))
      .reduce(
        (acc, curr) => {
          return {
            gross: acc.gross + (curr.price.gross * curr.quantity),
            net: acc.net + (curr.price.net * curr.quantity),
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
    };
  }
}