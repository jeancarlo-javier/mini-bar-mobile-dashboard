import { createStore } from 'vuex'
import type { Commit } from 'vuex'
import { getOrders, createOrder } from '../api/orders'
import type { Order, OrderCreate } from '../types/orderTypes'

// Define the types for the state and actions
export const SET_ORDERS = 'setOrders'
export const CREATE_ORDER = 'createOrder'

// Define the state type
interface State {
  orders: Array<Order>
  orderItems: Array<Order>
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
  },
  async [CREATE_ORDER]({ commit, state }: { commit: Commit; state: State }, order: OrderCreate) {
    const newOrder = await createOrder(order)
    commit(SET_ORDERS, [newOrder, ...state.orders] as Order[])
  }
}

const getters = {
  ordersByStatus: (state: State) => (status: string) => {
    return state.orders.filter((order) => order.status === status)
  }
}

const store = createStore({
  state: initialState,
  actions,
  mutations,
  getters
})

export default store
