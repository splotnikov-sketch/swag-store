// src/components/cart/cart-item.tsx

'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CartItem as CartItemType } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export function CartItem({
  item,
  pending,
  onUpdate,
  onRemove,
}: {
  item: CartItemType
  pending: boolean
  onUpdate: (quantity: number) => void
  onRemove: () => void
}) {
  return (
    <div className={`flex gap-4 ${pending ? 'opacity-50' : ''}`}>
      <div className="relative size-16 shrink-0 overflow-hidden rounded bg-muted">
        {item.product.images[0] && (
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-medium">{item.product.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatPrice(item.product.price, item.product.currency)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-6"
              disabled={pending || item.quantity <= 1}
              onClick={() => onUpdate(item.quantity - 1)}
            >
              <Minus className="size-3" />
            </Button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="size-6"
              disabled={pending}
              onClick={() => onUpdate(item.quantity + 1)}
            >
              <Plus className="size-3" />
            </Button>
          </div>
          <p className="text-sm font-medium">
            {formatPrice(item.lineTotal, item.product.currency)}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-6 shrink-0"
        disabled={pending}
        onClick={onRemove}
      >
        <Trash2 className="size-3" />
      </Button>
    </div>
  )
}