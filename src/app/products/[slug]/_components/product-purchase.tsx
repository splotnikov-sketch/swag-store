// src/app/products/[slug]/_components/product-purchase.tsx

import { getProductStock } from '@/lib/products'
import { Badge } from '@/components/ui/badge'
import ProductActions from './product-actions'

export default async function ProductPurchase({
  productId,
}: {
  productId: string
}) {
  const { data: stock } = await getProductStock(productId)

  return (
    <div className="flex flex-col gap-4">
      {!stock.inStock ? (
        <Badge variant="destructive">Out of stock</Badge>
      ) : stock.lowStock ? (
        <Badge variant="secondary" className="text-orange-600">
          Low stock — {stock.stock} left
        </Badge>
      ) : (
        <Badge variant="secondary">In stock</Badge>
      )}
      <ProductActions
        productId={productId}
        stock={stock.stock}
        inStock={stock.inStock}
      />
    </div>
  )
}