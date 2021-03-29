export const state = () => ({
  isAsideShown: false,
})

export const mutations = {
  showAside(state) {
    state.isAsideShown = true
  },
  hideAside(state) {
    state.isAsideShown = false
  },
}

export const actions = {
  showAside(context) {
    context.commit('showAside')
  },
  hideAside(context) {
    context.commit('hideAside')
  },
  toggleAside(context) {
    console.log(context.state)
    const { isAsideShown } = context.state
    isAsideShown
      ? context.commit('hideAside')
      : context.commit('showAside')
  }
}