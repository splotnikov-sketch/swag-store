// src/components/product-grid-skeleton.tsx

import { ProductCardSkeleton } from './product-card-skeleton'

export function ProductGridSkeleton({ count = 3 }: { count?: number }) {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{Array.from({ length: count }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton items never reorder
				<ProductCardSkeleton key={`skeleton-${i}`} />
			))}
		</div>
	)
}
