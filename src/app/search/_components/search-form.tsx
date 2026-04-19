// src/app/search/_components/search-form.tsx

'use client'

import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SearchForm({ initialQuery }: { initialQuery: string }) {
	const router = useRouter()
	const [query, setQuery] = useState(initialQuery)

	const updateUrl = useCallback(
		(q: string) => {
			const params = new URLSearchParams()
			if (q) {
				params.set('q', q)
			}
			const search = params.toString()
			router.replace(`/search${search ? `?${search}` : ''}`)
		},
		[router]
	)

	const debouncedUpdate = useMemo(
		() =>
			debounce((q: string) => {
				if (q.length >= 3 || q.length === 0) {
					updateUrl(q)
				}
			}, 500),
		[updateUrl]
	)

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value
		setQuery(value)
		debouncedUpdate(value)
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		debouncedUpdate.cancel()
		updateUrl(query)
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-4">
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
			<Button type="submit">Search</Button>
		</form>
	)
}
