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

export function CartSheet({ cart }: { cart: Cart | null }) {
  const [open, setOpen] = useState(false)
  const count = cart?.totalItems ?? 0

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
        <p className="py-12 text-center text-muted-foreground">
          Your cart is empty
        </p>
      </SheetContent>
    </Sheet>
  )
}