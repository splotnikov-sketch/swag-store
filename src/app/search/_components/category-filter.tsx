// src/app/search/_components/category-filter.tsx

'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import type { Category } from '@/lib/types'

export default function CategoryFilter({
	value,
	categories,
	onChange
}: {
	value: string
	categories: Category[]
	onChange: (category: string) => void
}) {
	return (
		<Select value={value || 'all'} onValueChange={onChange}>
			<SelectTrigger className="w-full sm:w-48">
				<SelectValue placeholder="All categories" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All categories</SelectItem>
				{categories.map((cat) => (
					<SelectItem key={cat.slug} value={cat.slug}>
						{cat.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
