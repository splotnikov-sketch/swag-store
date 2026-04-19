// src/app/products/[slug]/_components/product-actions.tsx

'use client'

import { useState } from 'react'
import { addToCart } from '@/lib/cart'
import QuantitySelector from './quantity-selector'
import AddToCartButton from './add-to-cart-button'

export default function ProductActions({
  productId,
  stock,
  inStock,
}: {
  productId: string
  stock: number
  inStock: boolean
}) {
  const [quantity, setQuantity] = useState(1)

  async function handleAdd() {
    await addToCart(productId, quantity)
  }

  return (
    <div className="flex flex-col gap-4">
      {inStock && (
        <QuantitySelector
          stock={stock}
          quantity={quantity}
          onChange={setQuantity}
        />
      )}
      <AddToCartButton productId={productId}
        quantity={quantity} inStock={inStock} onAdd={handleAdd} />
    </div>
  )
}