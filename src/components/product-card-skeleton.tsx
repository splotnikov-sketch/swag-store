// src/components/product-card-skeleton.tsx

export function ProductCardSkeleton() {
	return (
		<div className="overflow-hidden rounded-lg border">
			<div className="aspect-square animate-pulse bg-muted" />
			<div className="flex flex-col gap-2 p-4">
				<div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
				<div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
			</div>
		</div>
	)
}
