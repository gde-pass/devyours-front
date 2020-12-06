export const state = () => ({
  isConnected: false,
})

export const mutations = {
  switchUserConnexionStatus(state) {
    state.isConnected = !state.isConnected
  },
}
