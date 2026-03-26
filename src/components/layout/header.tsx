// /src/components/layout/header.tsx

import Link from 'next/link'
import { clientEnv } from '@/env/client'

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          {clientEnv.NEXT_PUBLIC_APP_NAME}
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm hover:underline">
            Home
          </Link>
          <Link href="/search" className="text-sm hover:underline">
            Search
          </Link>
        </nav>
      </div>
    </header>
  )
}