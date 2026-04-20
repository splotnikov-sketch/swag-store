// /src/app/page.tsx

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductGridSkeleton } from '@/components/product-grid-skeleton'
import { FeaturedGrid } from './_components/featured-grid'
import { Hero } from './_components/hero'
import { PromoBanner } from './_components/promo-banner'

export const metadata: Metadata = {
	title: 'Home',
	description:
		'Shop curated swag — apparel, accessories, and gear for the community.',
	openGraph: {
		title: 'Home',
		description:
			'Shop curated swag — apparel, accessories, and gear for the community.'
	}
}

export default function Home() {
	return (
		<>
			<Suspense
				fallback={
					<div className="bg-primary px-4 py-3 text-center text-sm text-primary-foreground">
						Loading promotion...
					</div>
				}
			>
				<PromoBanner />
			</Suspense>
			<Hero />
			<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<Suspense fallback={<ProductGridSkeleton count={8} />}>
					<FeaturedGrid />
				</Suspense>
			</section>
		</>
	)
}
