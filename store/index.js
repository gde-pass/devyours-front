export const state = () => ({
  isConnected: false,
})

export const mutations = {
  switchUserConnexionStatus(state) {
    state.isConnected = !state.isConnected
  },
  switchOnUserConnexionStatus(state) {
    state.isConnected = true
  },
  switchOffUserConnexionStatus(state) {
    state.isConnected = false
  },
}
