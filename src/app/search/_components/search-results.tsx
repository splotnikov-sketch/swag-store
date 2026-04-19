// src/app/search/_components/search-results.tsx

import { ProductGrid } from '@/components/product-grid'
import { getProducts } from '@/lib/products'

export async function SearchResults({
	q,
	category
}: {
	q?: string
	category?: string
}) {
	const hasSearch = Boolean(q || category)

	const { data: products } = await getProducts({
		search: q,
		category,
		limit: hasSearch ? 5 : 12
	})

	if (products.length === 0) {
		return (
			<p className="py-12 text-center text-muted-foreground">
				No products found. Try a different search.
			</p>
		)
	}

	return <ProductGrid products={products} />
}
