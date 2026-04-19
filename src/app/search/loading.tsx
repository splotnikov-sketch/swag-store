// src/app/search/loading.tsx

import { ProductGridSkeleton } from '@/components/product-grid-skeleton'

export default function Loading() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-16">
			<div className="h-8 w-32 animate-pulse rounded bg-muted" />
			<div className="mt-8">
				<ProductGridSkeleton />
			</div>
		</div>
	)
}
