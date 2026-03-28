// src/app/products/[slug]/_components/product-image.tsx

import Image from 'next/image'

export default function ProductImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />
        </div>
    )
}