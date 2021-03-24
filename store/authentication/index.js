/*
* If you want to separate things into smaller files,
* you can create actions.js, mutations.js, state.js
*/
export const state = () => {
  return {
    isLoggedIn: false,
    email: null,
    logoutLink: null
  }
}

export const mutations = {
  login(state, payload) {
    state.isLoggedIn = true
    state.email = payload.email
  },
  logout(state) {
    state.isLoggedIn = false
    state.email = null
  }
}

const HARDCODED_EMAIL = 'victor@crystallize.com'

export const actions = {
  login(context) {
    context.commit('login', { email: HARDCODED_EMAIL })
  },
  logout(context) {
    context.commit('logout')
  }
}