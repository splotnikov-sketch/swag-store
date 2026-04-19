// src/app/products/[slug]/_components/product-purchase.tsx

import { Badge } from '@/components/ui/badge'
import { getProductStock } from '@/lib/products'
import type { Product } from '@/lib/types'
import ProductActions from './product-actions'

export default async function ProductPurchase({
	product
}: {
	product: Product
}) {
	const { data: stock } = await getProductStock(product.id)

	return (
		<div className="flex flex-col gap-4">
			{!stock.inStock ? (
				<Badge variant="destructive">Out of stock</Badge>
			) : stock.lowStock ? (
				<Badge variant="outline">Low stock — {stock.stock} left</Badge>
			) : (
				<Badge variant="secondary">In stock</Badge>
			)}
			<ProductActions
				product={product}
				stock={stock.stock}
				inStock={stock.inStock}
			/>
		</div>
	)
}
