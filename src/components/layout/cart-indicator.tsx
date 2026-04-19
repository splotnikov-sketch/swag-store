// src/components/layout/cart-indicator.tsx


import { getCart } from '@/lib/cart'
import { CartSheet } from '../cart/cart-sheet'

export async function CartIndicator() {
  const cart = await getCart()
  return <CartSheet cart={cart} />
}