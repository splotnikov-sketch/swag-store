// src/app/products/[slug]/page.tsx

import { getProductBySlug } from '@/lib/products'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params

    try {
        const { data: product } = await getProductBySlug(slug)
        return (
            <div className="mx-auto max-w-7xl px-4 py-16">
                Product Page for {product.name}
            </div>
        )
    } catch {
        notFound()
    }
}