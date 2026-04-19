// /src/components/layout/header.tsx

import Link from 'next/link'
import { clientEnv } from '@/env/client'
import { CartWidget } from '@/components/cart/cart-widget '

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
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
          <CartWidget />
        </nav>
      </div>
    </header>
  )
}