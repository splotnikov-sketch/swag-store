// /src/components/layout/footer.tsx

import { Suspense } from 'react'
import { clientEnv } from '@/env/client'
import { CurrentYear } from './current-year'

export function Footer() {
	return (
		<footer className="mt-auto border-t">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-4">
				<p className="text-sm text-gray-500">
					&copy;{' '}
					<Suspense fallback="2026">
						<CurrentYear />
					</Suspense>{' '}
					{clientEnv.NEXT_PUBLIC_APP_NAME}. All rights reserved.
				</p>
			</div>
		</footer>
	)
}
