// /src/app/page.tsx

import { Suspense } from 'react'
import { Hero } from './_components/hero'
import { PromoBanner } from './_components/promo-banner'

export default function Home() {
	return (
		<>
			<Suspense fallback={<div className="bg-black px-4 py-3 text-center text-sm text-white">Loading promotion...</div>}>
				<PromoBanner />
			</Suspense>
			<Hero />
		</>
	)
}