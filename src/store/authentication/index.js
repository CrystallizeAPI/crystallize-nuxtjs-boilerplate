import { serviceApi } from '/lib/service-api'

/*
* If you want to separate things into smaller files,
* you can create actions.js, mutations.js, state.js
*/
export const state = () => {
  return {
    isLoggedIn: false,
    user: null,
    logoutLink: null
  }
}

export const mutations = {
  login(state, payload) {
    state.isLoggedIn = true
    state.user = payload.user
    state.logoutLink = payload.logoutLink
  },
  logout(state) {
    state.isLoggedIn = false
    state.user = null
  }
}

export const actions = {
  sendMagicLink(context, payload) {
    return sendMagicLink({ email: payload.email })
      .then(response => {
        if (!response.data.user.sendMagicLink.success) {
          throw new Error("Something went wrong");
        }
      })
      .catch(() => {
        throw new Error("Could not send the login link email =(");
      })
  },
  login(context, payload) {
    const { user, logoutLink } = payload
    context.commit('login', { user, logoutLink })
  },
  logout(context) {
    context.commit('logout')
  }
}

function sendMagicLink({ email }) {
  return serviceApi({
    query: `
      mutation {
        user {
          sendMagicLink(
            email: "${email}"
            redirectURLAfterLogin: "${location.protocol}//${location.host}/account"
          ) {
            success
            error
          }
        }
      }
    `
  });
}