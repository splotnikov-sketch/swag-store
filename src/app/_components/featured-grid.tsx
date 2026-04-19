// src/app/_components/featured-grid.tsx

import Link from 'next/link'
import { ProductGrid } from '@/components/product-grid'
import { getProducts } from '@/lib/products'

export async function FeaturedGrid() {
	const { data: products } = await getProducts({ featured: true, limit: 6 })

	return (
		<>
			<div className="mb-8 flex items-center justify-between">
				<h2 className="text-2xl font-bold">Featured products</h2>
				<Link
					href="/search"
					className="text-sm text-muted-foreground hover:underline"
				>
					View all
				</Link>
			</div>
			<ProductGrid products={products} />
		</>
	)
}
