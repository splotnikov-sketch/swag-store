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
import type { Cart } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

export function CartSheet({ cart }: { cart: Cart | null }) {
  const [open, setOpen] = useState(false)
  const count = cart?.totalItems ?? 0
  const items = cart?.items ?? []

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative" aria-label="Open cart">
          <ShoppingCart className="size-5" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full p-0 text-xs"
            >
              {count}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart ({count})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-12">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4">
                <div className="size-16 rounded bg-muted" />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm font-medium">
                    {formatPrice(item.lineTotal, item.product.currency)}
                  </p>
                </div>
              </div>
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