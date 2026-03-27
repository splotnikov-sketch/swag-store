// src/app/_components/featured-grid.tsx

import Link from 'next/link'
import { getProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export async function FeaturedGrid() {
    const { data: products } = await getProducts({ featured: true, limit: 6 })

    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Featured products</h2>
                <Link href="/search" className="text-sm text-muted-foreground hover:underline">
                    View all
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}