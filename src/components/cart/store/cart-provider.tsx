// src/components/cart/store/cart-provider.tsx

'use client'

import { createContext, useContext, useOptimistic, useTransition } from 'react'
import type { Cart } from '@/lib/types'
import {
  addToCart as addToCartAction,
  updateCartItem as updateCartItemAction,
  removeCartItem as removeCartItemAction,
} from '@/lib/cart'
import { cartReducer } from './cart-reducer'

type CartContextType = {
  cart: Cart | null
  isPending: boolean
  addItem: (productId: string, quantity: number) => void
  updateItem: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function CartProvider({
  cart: serverCart,
  children,
}: {
  cart: Cart | null
  children: React.ReactNode
}) {
  const [optimisticCart, dispatch] = useOptimistic(serverCart, cartReducer)
  const [isPending, startTransition] = useTransition()

  function addItem(productId: string, quantity: number) {
    startTransition(async () => {
      dispatch({ type: 'add', productId, quantity })
      await addToCartAction(productId, quantity)
    })
  }

  function updateItem(productId: string, quantity: number) {
    startTransition(async () => {
      dispatch({ type: 'update', productId, quantity })
      await updateCartItemAction(productId, quantity)
    })
  }

  function removeItem(productId: string) {
    startTransition(async () => {
      dispatch({ type: 'remove', productId })
      await removeCartItemAction(productId)
    })
  }

  return (
    <CartContext value={{ cart: optimisticCart, isPending, addItem, updateItem, removeItem }}>
      {children}
    </CartContext>
  )
}