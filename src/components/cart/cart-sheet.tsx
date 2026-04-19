// src/components/cart/cart-sheet.tsx

'use client'

import { useState, useOptimistic, useTransition } from 'react'
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
import { updateCartItem, removeCartItem } from '@/lib/cart'
import { CartItem } from './cart-item'
import { CartSummary } from './cart-summary'
import { cartReducer } from './cart-reducer'

export function CartSheet({ cart }: { cart: Cart | null }) {
  const [open, setOpen] = useState(false)
  const [optimisticCart, dispatchOptimistic] = useOptimistic(cart, cartReducer)
  const [isPending, startTransition] = useTransition()

  const count = optimisticCart?.totalItems ?? 0
  const items = optimisticCart?.items ?? []

  function handleUpdate(productId: string, quantity: number) {
    startTransition(async () => {
      dispatchOptimistic({ type: 'update', productId, quantity })
      await updateCartItem(productId, quantity)
    })
  }

  function handleRemove(productId: string) {
    startTransition(async () => {
      dispatchOptimistic({ type: 'remove', productId })
      await removeCartItem(productId)
    })
  }

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
      <SheetContent>
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
                onUpdate={(qty) => handleUpdate(item.productId, qty)}
                onRemove={() => handleRemove(item.productId)}
              />
            ))}
            <CartSummary
              subtotal={optimisticCart!.subtotal}
              currency={optimisticCart!.currency}
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}