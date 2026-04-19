// /src/components/layout/header.tsx

import Link from 'next/link'
import { CartWidget } from '@/components/cart/cart-widget '
import { clientEnv } from '@/env/client'
import { MobileNav } from './mobile-nav'

export function Header() {
	return (
		<header className="sticky top-0 z-50 border-b bg-background">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-6">
					<MobileNav />
					<Link href="/" className="text-base font-bold md:text-lg">
						{clientEnv.NEXT_PUBLIC_APP_NAME}
					</Link>
					<nav className="hidden items-center gap-6 md:flex">
						<Link href="/" className="text-sm hover:underline">
							Home
						</Link>
						<Link href="/search" className="text-sm hover:underline">
							Search
						</Link>
					</nav>
				</div>

				<CartWidget />
			</div>
		</header>
	)
}
