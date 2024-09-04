import { createStore } from 'vuex'
import type { Commit } from 'vuex'
import { getOrders, createOrder, getOrderDetails, getOrderItems } from '../api/orders'
import type { Order, OrderCreate, OrderItemType } from '../types/orderTypes'

// Define the types for the state and actions
export const SET_ORDERS = 'setOrders'
export const CREATE_ORDER = 'createOrder'
export const COMPLETE_ORDER = 'completeOrder'
export const SET_ORDER_DETAILS = 'setOrderDetails'
export const FETCH_ORDERS = 'fetchOrders'
export const FETCH_ORDER_DETAILS = 'fetchOrderDetails'
export const FETCH_ORDER_ITEMS = 'fetchOrderItems'
export const CLEAR_ORDER_DETAILS = 'clearOrderDetails'
const SET_ORDER_ITEMS = 'setOrderItems'

// Define the state type
interface State {
  orders: Array<Order>
  userData: object
  orderDetails: Order | null
}

const initialState: State = {
  orders: [],
  userData: {},
  orderDetails: null
}

const mutations = {
  [SET_ORDERS](state: State, orders: Array<Order>) {
    state.orders = orders
  },
  [SET_ORDER_DETAILS](state: State, order: Order) {
    state.orderDetails = order
  },
  [SET_ORDER_ITEMS](state: State, items: Array<OrderItemType>) {
    if (!state.orderDetails) return
    state.orderDetails.items = items
  },
  [CLEAR_ORDER_DETAILS](state: State) {
    state.orderDetails = null
  }
}

const actions = {
  async [FETCH_ORDERS]({ commit }: { commit: Commit }) {
    const orders = await getOrders()
    commit(SET_ORDERS, orders)
  },
  async [CREATE_ORDER]({ commit, state }: { commit: Commit; state: State }, order: OrderCreate) {
    const newOrder = await createOrder(order)
    commit(SET_ORDERS, [newOrder, ...state.orders] as Order[])
  },
  // async [COMPLETE_ORDER]({ commit, state }: { commit: Commit; state: State }, orderId: number) {
  // const orders = [...state.orders]
  // const order = state.orders.find((order) => order.id === orderId)
  // console.log(orders)
  // if (!order) throw new Error('Order not found')
  // const orderIndex = orders.indexOf(order)
  // console.log('🚀 ~ orderIndex:', orderIndex)
  // },
  async [FETCH_ORDER_DETAILS]({ commit }: { commit: Commit }, orderId: number) {
    const order = await getOrderDetails(orderId)
    commit(SET_ORDER_DETAILS, order)
  },
  async [FETCH_ORDER_ITEMS]({ commit }: { commit: Commit }, orderId: number) {
    const items = await getOrderItems(orderId)
    commit(SET_ORDER_ITEMS, items)
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
