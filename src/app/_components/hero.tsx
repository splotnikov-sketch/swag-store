// src/app/_components/hero.tsx

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
      <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        The official swag store
      </h1>
      <p className="mx-auto max-w-md text-base text-muted-foreground sm:text-lg">
        Curated apparel, accessories, and gear for the community.
      </p>
      <Button asChild size="lg" className="rounded-full">
        <Link href="/search">Shop now</Link>
      </Button>
    </section>
  )
}