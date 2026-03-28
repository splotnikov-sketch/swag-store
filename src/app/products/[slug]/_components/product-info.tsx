// src/app/products/[slug]/_components/product-info.tsx

import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export default function ProductInfo({ product }: { product: Product }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold">
                {formatPrice(product.price, product.currency)}
            </p>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
        </div>
    )
}