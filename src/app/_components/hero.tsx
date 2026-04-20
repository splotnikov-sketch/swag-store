// src/app/_components/hero.tsx

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
	return (
		<section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
			<div className="flex flex-col items-start gap-6 text-left">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
					The official swag store
				</h1>
				<p className="max-w-md text-base text-muted-foreground sm:text-lg">
					Curated apparel, accessories, and gear for the community.
				</p>
				<Button asChild size="lg" className="rounded-full">
					<Link href="/search">Shop now</Link>
				</Button>
			</div>
			<div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
				<Image
					src="/hero.webp"
					alt="Swag Store"
					fill
					className="object-cover"
					sizes="(max-width: 1024px) 100vw, 50vw"
					priority
				/>
			</div>
		</section>
	)
}
