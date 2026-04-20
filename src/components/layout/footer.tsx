// /src/components/layout/footer.tsx

import Link from 'next/link'
import { Suspense } from 'react'
import { getStoreConfig } from '@/lib/store-config'
import { CurrentYear } from './current-year'

export async function Footer() {
	const { data: config } = await getStoreConfig()

	return (
		<footer className="mt-auto border-t">
			<div className="mx-auto flex min-h-16 max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row">
				<p className="text-sm text-muted-foreground">
					&copy;{' '}
					<Suspense fallback="2026">
						<CurrentYear />
					</Suspense>{' '}
					{config.storeName}. All rights reserved.
				</p>
				<nav className="flex items-center gap-4 text-sm text-muted-foreground">
					<Link
						href={config.socialLinks.twitter}
						className="hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						Twitter
					</Link>
					<Link
						href={config.socialLinks.github}
						className="hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</Link>
					<Link
						href={config.socialLinks.discord}
						className="hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						Discord
					</Link>
				</nav>
			</div>
		</footer>
	)
}
