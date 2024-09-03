import { createStore } from 'vuex'
import type { Commit } from 'vuex'
import { getOrders } from '../api/orders'
import type { Order } from '../types/orderTypes'

// Define the types for the state and actions
export const SET_ORDERS = 'setOrders'

// Define the state type
interface State {
  orders: Array<Order>
  orderItems: Array<object>
  userData: object
}

const initialState: State = {
  orders: [],
  orderItems: [],
  userData: {}
}

const mutations = {
  [SET_ORDERS](state: State, orders: Array<Order>) {
    state.orders = orders
  }
}

const actions = {
  async fetchOrders({ commit }: { commit: Commit }) {
    const orders = await getOrders()
    commit(SET_ORDERS, orders)
  }
}

const getters = {
  // getOrders: (state: State) => state.orders
}

const store = createStore({
  state: initialState,
  actions,
  mutations,
  getters
})

export default store
