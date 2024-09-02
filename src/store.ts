import { createStore } from 'vuex'

// Define the state type
interface State {
  orderItems: Array<object>
  userData: object
  token: string | null
}

// Define the initial state with the type
const initialState: State = {
  orderItems: [],
  userData: {},
  token: null
}

const mutations = {
  setToken(state: State, token: string) {
    state.token = token
  }
}

const actions = {}

const store = createStore({
  state: initialState,
  actions,
  mutations
})

export default store
