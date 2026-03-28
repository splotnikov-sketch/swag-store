// src/app/products/[slug]/page.tsx

import { getProductBySlug } from '@/lib/products'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductImage from './_components/product-image'
import ProductInfo from './_components/product-info'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const { data: product } = await getProductBySlug(slug)

    if (!product) {
        return { title: 'Product not found' }
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.images,
        },
    }
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params

    try {
        const { data: product } = await getProductBySlug(slug)
        return (
            <div className="mx-auto max-w-7xl px-4 py-16">
                <ProductImage src={product.images[0]} alt={product.name} />
                <ProductInfo product={product} />
            </div>
        )
    } catch {
        notFound()
    }
}