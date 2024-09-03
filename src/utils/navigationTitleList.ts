interface NavigationTitle {
  title: string
  backToLastPage: boolean
}

const navigationTitles: Record<string, NavigationTitle> = {
  home: {
    title: 'Dashboard',
    backToLastPage: false
  },
  login: {
    title: 'Login',
    backToLastPage: false
  },
  'order-details': {
    title: 'Order Details',
    backToLastPage: true
  },
  'order-items': {
    title: 'Order Items',
    backToLastPage: false
  },
  orders: {
    title: 'Orders',
    backToLastPage: false
  }
}

export default navigationTitles
