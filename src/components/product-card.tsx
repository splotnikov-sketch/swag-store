// src/components/product-card.tsx

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

export function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.slug}`}>
            <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-square bg-muted">
                    {product.images[0] && (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    )}
                </div>
                <CardContent className="flex flex-col gap-1 p-4">
                    <h3 className="truncate font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        {formatPrice(product.price, product.currency)}
                    </p>
                </CardContent>
            </Card>
        </Link>
    )
}