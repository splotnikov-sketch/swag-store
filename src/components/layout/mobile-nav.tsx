'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet'

export function MobileNav() {
	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu className="size-5" />
					<span className="sr-only">Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-64 px-6">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<nav className="flex flex-col gap-4 px-2 py-4">
					<Link
						href="/"
						className="text-sm hover:underline"
						onClick={() => setOpen(false)}
					>
						Home
					</Link>
					<Link
						href="/search"
						className="text-sm hover:underline"
						onClick={() => setOpen(false)}
					>
						Search
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	)
}
