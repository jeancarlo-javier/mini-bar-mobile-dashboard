import { createStore } from 'vuex'
import type { Commit } from 'vuex'
import type { Order, OrderCreate, OrderItemType } from '../types/orderTypes'
import type { Product, ProductItemDb } from '../types/productTypes'
import { getOrders, createOrder, getOrderDetails, getOrderItems, addItemsToOrder } from '../api/orders'
import { getProducts } from '../api/products'
import { getUserData } from '../api/user'

// Define the types for the state and actions
export const CREATE_ORDER = 'createOrder'
export const COMPLETE_ORDER = 'completeOrder'
export const FETCH_ORDERS = 'fetchOrders'
export const FETCH_ORDER_DETAILS = 'fetchOrderDetails'
export const FETCH_ORDER_ITEMS = 'fetchOrderItems'
export const CLEAR_ORDER_DETAILS = 'clearOrderDetails'
export const FETCH_PRODUCTS = 'fetchProducts'
export const FETCH_USER_DATA = 'fetchUserData'
export const ADD_ITEMS_TO_ORDER = 'addItemsToOrder'
const SET_ORDER_DETAILS = 'setOrderDetails'
const SET_ORDERS = 'setOrders'
const SET_PRODUCTS = 'setProducts'
const SET_ORDER_ITEMS = 'setOrderItems'
const SET_USER_DATA = 'setUserData'
const SET_ORDER_TOTAL = 'setOrderTotal'

// Define the state type
interface State {
  orders: Array<Order>
  userData: object
  orderDetails: Order | null
  products: Array<Product>
}

const initialState: State = {
  orders: [],
  userData: {},
  orderDetails: null,
  products: []
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
  },
  [SET_PRODUCTS](state: State, products: Array<Product>) {
    state.products = products
  },
  [SET_USER_DATA](state: State, userData: object) {
    state.userData = userData
  },
  [ADD_ITEMS_TO_ORDER](state: State, items: Array<OrderItemType>) {
    if (!state.orderDetails) return
    state.orderDetails.items.unshift(...items)
  },
  [SET_ORDER_TOTAL](state: State, total: number) {
    if (!state.orderDetails) return
    state.orderDetails.total = total
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
  async [FETCH_ORDER_DETAILS]({ commit }: { commit: Commit }, orderId: number) {
    const order = await getOrderDetails(orderId)
    commit(SET_ORDER_DETAILS, order)
  },
  async [FETCH_ORDER_ITEMS]({ commit }: { commit: Commit }, orderId: number) {
    const items = await getOrderItems(orderId)
    commit(SET_ORDER_ITEMS, items)
  },
  async [FETCH_PRODUCTS]({ commit }: { commit: Commit }) {
    const products = await getProducts()
    commit(SET_PRODUCTS, products)
  },
  async [FETCH_USER_DATA]({ commit }: { commit: Commit }) {
    const userData = await getUserData()
    commit(SET_USER_DATA, userData)
  },
  async [ADD_ITEMS_TO_ORDER](
    { commit }: { commit: Commit },
    { orderId, items }: { orderId: number; items: Array<ProductItemDb> }
  ) {
    const newOrderItems = await addItemsToOrder(orderId, items)

    if (!newOrderItems || !store.state.orderDetails) return

    const newItemsTotal = newOrderItems.reduce((acc, item) => item.amount * item.quantity + acc, 0)
    const newTotal = newItemsTotal + store.state.orderDetails.total

    commit(ADD_ITEMS_TO_ORDER, newOrderItems.reverse())
    commit(SET_ORDER_TOTAL, newTotal)
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
