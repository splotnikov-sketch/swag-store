// src/components/cart/store/cart-reducer.ts

import type { Cart } from '@/lib/types'

export type CartAction =
	| { type: 'add'; productId: string; quantity: number }
	| { type: 'update'; productId: string; quantity: number }
	| { type: 'remove'; productId: string }

export function cartReducer(
	cart: Cart | null,
	action: CartAction
): Cart | null {
	if (!cart) {
		if (action.type === 'add') {
			return {
				token: '',
				items: [],
				totalItems: action.quantity,
				subtotal: 0,
				currency: 'USD',
				createdAt: '',
				updatedAt: ''
			}
		}
		return null
	}

	switch (action.type) {
		case 'remove': {
			const items = cart.items.filter((i) => i.productId !== action.productId)
			return {
				...cart,
				items,
				totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
				subtotal: items.reduce((sum, i) => sum + i.lineTotal, 0)
			}
		}
		case 'update': {
			const items = cart.items.map((i) =>
				i.productId === action.productId
					? {
							...i,
							quantity: action.quantity,
							lineTotal: i.product.price * action.quantity
						}
					: i
			)
			return {
				...cart,
				items,
				totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
				subtotal: items.reduce((sum, i) => sum + i.lineTotal, 0)
			}
		}
		case 'add': {
			const existing = cart.items.find((i) => i.productId === action.productId)
			if (existing) {
				const items = cart.items.map((i) =>
					i.productId === action.productId
						? {
								...i,
								quantity: i.quantity + action.quantity,
								lineTotal: i.product.price * (i.quantity + action.quantity)
							}
						: i
				)
				return {
					...cart,
					items,
					totalItems: cart.totalItems + action.quantity,
					subtotal: items.reduce((sum, i) => sum + i.lineTotal, 0)
				}
			}
			return {
				...cart,
				totalItems: cart.totalItems + action.quantity
			}
		}
	}
}
