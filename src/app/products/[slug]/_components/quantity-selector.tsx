// src/app/products/[slug]/_components/quantity-selector.tsx

'use client'

import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

export default function QuantitySelector({
  stock,
  quantity,
  onChange,
}: {
  stock: number
  quantity: number
  onChange: (q: number) => void
}) {
  const atMax = quantity >= stock

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="disabled:opacity-30"
          onClick={() => onChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-8 text-center font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="disabled:opacity-30"
          onClick={() => onChange(Math.min(stock, quantity + 1))}
          disabled={atMax}
          aria-label="Increase quantity"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      {atMax && (
        <p className="text-xs text-muted-foreground">
          Max quantity reached ({stock} available)
        </p>
      )}
    </div>
  )
}