// src/components/cart/store/cart-reducer.test.ts

import { describe, expect, it } from 'vitest'
import { cartReducer } from './cart-reducer'
import type { Cart } from '@/lib/types'

const mockCart: Cart = {
  token: 'test-token',
  items: [
    {
      productId: 'bottle_001',
      quantity: 2,
      addedAt: '2026-01-01',
      product: {
        id: 'bottle_001',
        name: 'Water Bottle',
        slug: 'water-bottle',
        description: 'A bottle',
        price: 3500,
        currency: 'USD',
        category: 'bottles',
        images: [],
        featured: false,
        tags: [],
        createdAt: '2026-01-01',
      },
      lineTotal: 7000,
    },
  ],
  totalItems: 2,
  subtotal: 7000,
  currency: 'USD',
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
}

describe('cartReducer', () => {
  it('returns null for any action when cart is null', () => {
    expect(cartReducer(null, { type: 'remove', productId: 'x' })).toBeNull()
  })

  it('removes an item', () => {
    const result = cartReducer(mockCart, { type: 'remove', productId: 'bottle_001' })
    expect(result!.items).toHaveLength(0)
    expect(result!.totalItems).toBe(0)
    expect(result!.subtotal).toBe(0)
  })

  it('updates item quantity', () => {
    const result = cartReducer(mockCart, { type: 'update', productId: 'bottle_001', quantity: 5 })
    expect(result!.items[0].quantity).toBe(5)
    expect(result!.items[0].lineTotal).toBe(17500)
    expect(result!.totalItems).toBe(5)
    expect(result!.subtotal).toBe(17500)
  })

  it('bumps totalItems on add for existing item', () => {
    const result = cartReducer(mockCart, { type: 'add', productId: 'bottle_001', quantity: 1 })
    expect(result!.items[0].quantity).toBe(3)
    expect(result!.totalItems).toBe(3)
  })

  it('bumps totalItems on add for new item', () => {
    const result = cartReducer(mockCart, { type: 'add', productId: 'new_item', quantity: 1 })
    expect(result!.totalItems).toBe(3)
  })
})

describe('cartReducer rollback scenarios', () => {
  it('remove then rollback restores original cart', () => {
    const removed = cartReducer(mockCart, { type: 'remove', productId: 'bottle_001' })
    expect(removed!.items).toHaveLength(0)
    expect(mockCart.items).toHaveLength(1)
    expect(mockCart.totalItems).toBe(2)
  })

  it('update then rollback restores original quantity', () => {
    const updated = cartReducer(mockCart, { type: 'update', productId: 'bottle_001', quantity: 99 })
    expect(updated!.items[0].quantity).toBe(99)
    expect(mockCart.items[0].quantity).toBe(2)
    expect(mockCart.items[0].lineTotal).toBe(7000)
  })

  it('reducer never mutates the original cart', () => {
    const original = JSON.parse(JSON.stringify(mockCart))
    cartReducer(mockCart, { type: 'remove', productId: 'bottle_001' })
    cartReducer(mockCart, { type: 'update', productId: 'bottle_001', quantity: 50 })
    cartReducer(mockCart, { type: 'add', productId: 'bottle_001', quantity: 10 })
    expect(mockCart).toEqual(original)
  })
})