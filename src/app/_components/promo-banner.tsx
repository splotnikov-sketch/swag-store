// /src/app/_components/promo-banner.tsx

import { Badge } from '@/components/ui/badge'
import { getPromotion } from '@/lib/promotions'

export async function PromoBanner() {
	const { data: promo } = await getPromotion()

	if (!promo.active) {
		return null
	}

	return (
		<section className="bg-black px-4 py-3 text-center text-white">
			<p className="text-sm">
				{promo.title} — {promo.description}{' '}
				<Badge variant="secondary" className="ml-2">
					{promo.code}
				</Badge>
			</p>
		</section>
	)
}
