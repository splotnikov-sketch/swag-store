// src/app/products/[slug]/_components/add-to-cart-button.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function AddToCartButton({
  productId,
  quantity,
  inStock,
  onAdd,
}: {
  productId: string
  quantity: number
  inStock: boolean
  onAdd: () => Promise<void>
}) {
  const [pending, setPending] = useState(false)
  const [added, setAdded] = useState(false)

  async function handleClick() {
    setPending(true)
    try {
      await onAdd()
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setPending(false)
    }
  }

  return (
    <Button
      size="lg"
      disabled={!inStock || pending}
      className="w-full"
      onClick={handleClick}
    >
      {!inStock ? (
        'Out of Stock'
      ) : pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Adding...
        </>
      ) : added ? (
        'Added!'
      ) : (
        'Add to Cart'
      )}
    </Button>
  )
}