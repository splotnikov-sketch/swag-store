import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
    return (
        <section className="flex flex-col items-center gap-6 px-4 py-24 text-center">
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight">
                The official swag store
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
                Curated apparel, accessories, and gear for the community.
            </p>
            <Button asChild size="lg" className="rounded-full">
                <Link href="/search">Shop now</Link>
            </Button>
        </section>
    )
}