// src/components/cart/cart-sheet.tsx

'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Cart } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { updateCartItem, removeCartItem } from '@/lib/cart'
import { CartItem } from './cart-item'

export function CartSheet({ cart }: { cart: Cart | null }) {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState<string | null>(null)
  const count = cart?.totalItems ?? 0
  const items = cart?.items ?? []

  async function handleUpdate(productId: string, quantity: number) {
    setPending(productId)
    try {
      await updateCartItem(productId, quantity)
    } finally {
      setPending(null)
    }
  }

  async function handleRemove(productId: string) {
    setPending(productId)
    try {
      await removeCartItem(productId)
    } finally {
      setPending(null)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-start gap-1" aria-label="Open cart">
          <ShoppingCart className="size-5 mt-0.5" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="h-4 min-w-4 rounded-full px-1 font-mono text-[10px] tabular-nums"
            >
              {count}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col px-4">
        <SheetHeader>
          <SheetTitle>Cart ({count})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            Your cart is empty
          </p>
        ) : (
          <div className="flex flex-col gap-4 overflow-y-auto py-4">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                pending={pending === item.productId}
                onUpdate={(qty) => handleUpdate(item.productId, qty)}
                onRemove={() => handleRemove(item.productId)}
              />
            ))}
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>{formatPrice(cart!.subtotal, cart!.currency)}</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}