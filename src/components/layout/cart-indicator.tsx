// src/components/layout/cart-indicator.tsx

import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getCart } from '@/lib/cart'

export async function CartIndicator() {
  const cart = await getCart()
  const count = cart?.totalItems ?? 0

  return (
    <div className="relative">
      <ShoppingCart className="size-5" />
      {count > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full p-0 text-xs"
        >
          {count}
        </Badge>
      )}
    </div>
  )
}