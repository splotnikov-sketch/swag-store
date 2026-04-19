// src/app/search/page.tsx

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductGridSkeleton } from '@/components/product-grid-skeleton'
import { getCategories } from '@/lib/categories'
import SearchForm from './_components/search-form'
import { SearchResults } from './_components/search-results'

export const metadata: Metadata = {
	title: 'Search',
	description: 'Search our collection of products.'
}

type Props = {
	searchParams: Promise<{ q?: string; category?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
	const { q, category } = await searchParams
	const { data: categories } = await getCategories()

	return (
		<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<h1 className="mb-8 text-3xl font-bold">Search</h1>

			<SearchForm
				initialQuery={q ?? ''}
				initialCategory={category ?? ''}
				categories={categories}
			/>

			<div className="mt-8">
				<Suspense key={`${q}-${category}`} fallback={<ProductGridSkeleton />}>
					<SearchResults q={q} category={category} />
				</Suspense>
			</div>
		</div>
	)
}
