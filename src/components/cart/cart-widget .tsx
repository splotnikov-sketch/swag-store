// src/components/cart/cart-sheet.tsx

'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { CartItem } from './cart-item'
import { CartSummary } from './cart-summary'
import { useCart } from './store/cart-provider'

export function CartWidget() {
  const [open, setOpen] = useState(false)
  const { cart, isPending, updateItem, removeItem } = useCart()

  const count = cart?.totalItems ?? 0
  const items = cart?.items ?? []

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="flex items-start gap-1" aria-label="Open cart">
          <ShoppingCart className="mt-0.5 size-5" />
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
                pending={isPending}
                onUpdate={(qty) => updateItem(item.productId, qty)}
                onRemove={() => removeItem(item.productId)}
              />
            ))}
            <CartSummary subtotal={cart!.subtotal} currency={cart!.currency} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}