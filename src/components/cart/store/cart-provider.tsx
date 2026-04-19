// src/components/cart/store/cart-provider.tsx

'use client'

import { createContext, useContext, useOptimistic, useTransition, useCallback } from 'react'
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

  const addItem = useCallback((productId: string, quantity: number) => {
    startTransition(async () => {
      dispatch({ type: 'add', productId, quantity })
      try {
        await addToCartAction(productId, quantity)
      } catch (error) {
        console.error('Failed to add item:', error)
      }
    })
  }, [dispatch])

  const updateItem = useCallback((productId: string, quantity: number) => {
    startTransition(async () => {
      dispatch({ type: 'update', productId, quantity })
      try {
        await updateCartItemAction(productId, quantity)
      } catch (error) {
        console.error('Failed to update item:', error)
      }
    })
  }, [dispatch])

  const removeItem = useCallback((productId: string) => {
    startTransition(async () => {
      dispatch({ type: 'remove', productId })
      try {
        // Simulate failure
        // throw new Error('Simulated failure')
        await removeCartItemAction(productId)
      } catch (error) {
        console.error('Failed to remove item:', error)
      }
    })
  }, [dispatch])

  return (
    <CartContext value={{ cart: optimisticCart, isPending, addItem, updateItem, removeItem }}>
      {children}
    </CartContext>
  )
}