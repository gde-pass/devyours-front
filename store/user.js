export const state = () => ({
  counter: 0,
  isConnected: false,
})

export const mutations = {
  increment: (state) => state.counter++,
  decrement: (state) => state.counter--,
  toggle: (state) => (state.isConnected = !state.isConnected),
}

export const getters = {
  getStatus: (state) => {
    return state.isConnected
  },
}
