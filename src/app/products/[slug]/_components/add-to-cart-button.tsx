// src/app/products/[slug]/_components/add-to-cart-button.tsx

'use client'

import { Button } from '@/components/ui/button'

export default function AddToCartButton({
  productId,
  quantity,
  inStock,
}: {
  productId: string
  quantity: number
  inStock: boolean
}) {
  return (
    <Button size="lg" disabled={!inStock} className="w-full">
      {inStock ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  )
}