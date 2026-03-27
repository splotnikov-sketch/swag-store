// /src/app/page.tsx

import { getProducts } from '@/lib/products'
import { getCategories } from '@/lib/categories'
import { getPromotion } from '@/lib/promotions'
import { getStoreConfig } from '@/lib/store-config'

export default async function Home() {
  const [products, categories, promotion, config] = await Promise.all([
    getProducts({ limit: 2 }),
    getCategories(),
    getPromotion(),
    getStoreConfig(),
  ])

  return (
    <pre className="p-8 text-sm">
      {JSON.stringify({ products, categories, promotion, config }, null, 2)}
    </pre>
  )
}