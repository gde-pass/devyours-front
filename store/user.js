export const state = () => ({
  isConnected: false,
})

export const mutations = {
  toggle: (state) => (state.isConnected = !state.isConnected),
}

export const getters = {
  getStatus: (state) => {
    return state.isConnected
  },
}
