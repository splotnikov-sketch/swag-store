// src/app/search/_components/search-form.tsx

'use client'

import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Category } from '@/lib/types'
import CategoryFilter from './category-filter'

export default function SearchForm({
	initialQuery,
	initialCategory,
	categories
}: {
	initialQuery: string
	initialCategory: string
	categories: Category[]
}) {
	const router = useRouter()
	const [query, setQuery] = useState(initialQuery)
	const [category, setCategory] = useState(initialCategory)

	const updateUrl = useCallback(
		(q: string, cat: string) => {
			const params = new URLSearchParams()
			if (q) {
				params.set('q', q)
			}
			if (cat) {
				params.set('category', cat)
			}
			const search = params.toString()
			router.replace(`/search${search ? `?${search}` : ''}`)
		},
		[router]
	)

	const debouncedUpdate = useMemo(
		() =>
			debounce((q: string, cat: string) => {
				if (q.length >= 3 || q.length === 0) {
					updateUrl(q, cat)
				}
			}, 500),
		[updateUrl]
	)

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		setQuery(value)
		debouncedUpdate(value, category)
	}

	function handleCategoryChange(value: string) {
		const cat = value === 'all' ? '' : value
		setCategory(cat)
		debouncedUpdate.cancel()
		updateUrl(query, cat)
	}

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault()
		debouncedUpdate.cancel()
		updateUrl(query, category)
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					type="text"
					placeholder="Search products..."
					value={query}
					onChange={handleChange}
					className="pl-10"
				/>
			</div>
			<CategoryFilter
				value={category}
				categories={categories}
				onChange={handleCategoryChange}
			/>
			<Button type="submit">Search</Button>
		</form>
	)
}
