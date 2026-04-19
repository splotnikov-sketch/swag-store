// src/app/search/page.tsx

import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export const metadata: Metadata = {
    title: 'Search',
    description: 'Search our collection of products.',
}

type Props = {
    searchParams: Promise<{ q?: string; category?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
    const { q, category } = await searchParams
    const hasSearch = Boolean(q || category)

    const { data: products } = await getProducts({
        search: q,
        category,
        limit: hasSearch ? 5 : 12,
    })

    return (
        <div className="mx-auto max-w-7xl px-4 py-16">
            <h1 className="mb-8 text-3xl font-bold">Search</h1>

            {/* TODO: SearchForm */}

            {products.length === 0 ? (
                <p className="py-12 text-center text-muted-foreground">
                    No products found. Try a different search.
                </p>
            ) : (
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}