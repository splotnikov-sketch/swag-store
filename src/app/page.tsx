// /src/app/page.tsx

import { Suspense } from 'react'
import { Hero } from './_components/hero'
import { PromoBanner } from './_components/promo-banner'
import { FeaturedGrid } from './_components/featured-grid'

export default function Home() {
	return (
		<>
			<Suspense fallback={<div className="bg-black px-4 py-3 text-center text-sm text-white">Loading promotion...</div>}>
				<PromoBanner />
			</Suspense>
			<Hero />
			<Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16">Loading products...</div>}>
				<FeaturedGrid />
			</Suspense>
		</>
	)
}