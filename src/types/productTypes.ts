export interface Product {
  id: number
  name: string
  description: string
  price: number
}

export interface ProductItem extends Product {
  quantity: number
}

export interface ProductItemDb {
  product_id: number
  quantity: number
}
