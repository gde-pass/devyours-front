import { GetterTree, MutationTree } from 'vuex'

export const state = () => ({
  counter: 0,
  isConnected: false,
})

export type State = ReturnType<typeof state>

export const mutations: MutationTree<State> = {
  increment: (state: State) => state.counter,
  decrement: (state: State) => state.counter--,
  toggle: (state: State) => (state.isConnected = !state.isConnected),
}

export const getters: GetterTree<State, State> = {
  getStatus: (state: State) => {
    return state.isConnected
  },
}
