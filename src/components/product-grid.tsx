// src/components/product-grid.tsx

import type { Product } from '@/lib/types'
import { ProductCard } from './product-card'

export function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, i) => (
                <ProductCard key={product.id} product={product} eager={i < 3} />
            ))}
        </div>
    )
}