// src/app/products/[slug]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getProductBySlug } from '@/lib/products'
import ProductImage from './_components/product-image'
import ProductInfo from './_components/product-info'
import ProductPurchase from './_components/product-purchase'

type Props = {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	try {
		const { data: product } = await getProductBySlug(slug)
		return {
			title: product.name,
			description: product.description,
			openGraph: {
				title: product.name,
				description: product.description,
				images: product.images
			}
		}
	} catch {
		return { title: 'Product not found' }
	}
}

export default async function ProductPage({ params }: Props) {
	const { slug } = await params

	try {
		const { data: product } = await getProductBySlug(slug)
		return (
			<div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid gap-12 md:grid-cols-2">
					<ProductImage src={product.images[0]} alt={product.name} />

					<div className="flex flex-col gap-6">
						<ProductInfo product={product} />

						<Suspense
							fallback={
								<div className="flex flex-col gap-4">
									<div className="h-6 w-32 animate-pulse rounded bg-muted" />
									<div className="h-10 w-40 animate-pulse rounded bg-muted" />
									<div className="h-12 w-full animate-pulse rounded bg-muted" />
								</div>
							}
						>
							<ProductPurchase productId={product.id} />
						</Suspense>
					</div>
				</div>
			</div>
		)
	} catch {
		notFound()
	}
}
