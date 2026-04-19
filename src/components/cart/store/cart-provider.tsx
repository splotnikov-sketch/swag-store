// src/components/cart/store/cart-provider.tsx

'use client'

import {
	createContext,
	useCallback,
	useContext,
	useOptimistic,
	useState,
	useTransition
} from 'react'
import {
	addToCart as addToCartAction,
	removeCartItem as removeCartItemAction,
	updateCartItem as updateCartItemAction
} from '@/lib/cart'
import type { Cart, Product } from '@/lib/types'
import { cartReducer } from './cart-reducer'

type CartContextType = {
	cart: Cart | null
	addItem: (productId: string, quantity: number, product?: Product) => void
	updateItem: (productId: string, quantity: number) => void
	removeItem: (productId: string) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function useCart() {
	const ctx = useContext(CartContext)
	if (!ctx) {
		throw new Error('useCart must be used within CartProvider')
	}
	return ctx
}

export function CartProvider({
	cart: serverCart,
	children
}: {
	cart: Cart | null
	children: React.ReactNode
}) {
	const [optimisticCart, dispatch] = useOptimistic(serverCart, cartReducer)
	const [, startTransition] = useTransition()
	const [, setPendingId] = useState<string | null>(null)

	const addItem = useCallback(
		(productId: string, quantity: number, product?: Product) => {
			startTransition(async () => {
				dispatch({ type: 'add', productId, quantity, product })
				try {
					await addToCartAction(productId, quantity)
				} catch (error) {
					console.error('Failed to add item:', error)
				}
			})
		},
		[dispatch]
	)

	const updateItem = useCallback(
		(productId: string, quantity: number) => {
			setPendingId(productId)
			startTransition(async () => {
				dispatch({ type: 'update', productId, quantity })
				try {
					await updateCartItemAction(productId, quantity)
				} catch (error) {
					console.error('Failed to update item:', error)
				} finally {
					setPendingId(null)
				}
			})
		},
		[dispatch]
	)

	const removeItem = useCallback(
		(productId: string) => {
			startTransition(async () => {
				dispatch({ type: 'remove', productId })
				try {
					// Simulate failure
					// throw new Error('Simulated failure')
					await removeCartItemAction(productId)
				} catch (error) {
					console.error('Failed to remove item:', error)
				}
			})
		},
		[dispatch]
	)

	return (
		<CartContext
			value={{
				cart: optimisticCart,
				addItem,
				updateItem,
				removeItem
			}}
		>
			{children}
		</CartContext>
	)
}
