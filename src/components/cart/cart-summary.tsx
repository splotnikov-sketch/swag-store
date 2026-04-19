// src/components/cart/cart-summary.tsx

import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'

export function CartSummary({
  subtotal,
  currency,
}: {
  subtotal: number
  currency: string
}) {
  return (
    <>
      <Separator />
      <div className="flex justify-between font-medium">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal, currency)}</span>
      </div>
    </>
  )
}