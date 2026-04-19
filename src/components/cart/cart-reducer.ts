// src/components/cart/cart-reducer.ts

import type { Cart } from '@/lib/types'

export type CartAction =
  | { type: 'update'; productId: string; quantity: number }
  | { type: 'remove'; productId: string }

export function cartReducer(cart: Cart | null, action: CartAction): Cart | null {
  if (!cart) return null

  switch (action.type) {
    case 'remove': {
      const items = cart.items.filter((i) => i.productId !== action.productId)
      return {
        ...cart,
        items,
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        subtotal: items.reduce((sum, i) => sum + i.lineTotal, 0),
      }
    }
    case 'update': {
      const items = cart.items.map((i) =>
        i.productId === action.productId
          ? {
              ...i,
              quantity: action.quantity,
              lineTotal: i.product.price * action.quantity,
            }
          : i,
      )
      return {
        ...cart,
        items,
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        subtotal: items.reduce((sum, i) => sum + i.lineTotal, 0),
      }
    }
  }
}