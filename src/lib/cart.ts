// src/lib/cart.ts

'use server'

import { updateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { apiFetch } from './api'
import type { ApiResponse, Cart } from './types'

const CART_COOKIE = 'cart-token'
const CART_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

async function getCartToken(): Promise<string | undefined> {
	const cookieStore = await cookies()
	return cookieStore.get(CART_COOKIE)?.value
}

async function setCartToken(token: string) {
	const cookieStore = await cookies()
	cookieStore.set(CART_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: CART_MAX_AGE
	})
}

export async function createCart(): Promise<Cart> {
	const { data } = await apiFetch<ApiResponse<Cart>>('/cart/create', {
		method: 'POST'
	})
	await setCartToken(data.token)
	return data
}

export async function getCart(): Promise<Cart | null> {
	const token = await getCartToken()
	if (!token) {
		return null
	}

	try {
		const { data } = await apiFetch<ApiResponse<Cart>>('/cart', {
			headers: { 'x-cart-token': token }
		})
		return data
	} catch {
		return null
	}
}

export async function addToCart(
	productId: string,
	quantity: number
): Promise<Cart> {
	let token = await getCartToken()

	if (!token) {
		const cart = await createCart()
		token = cart.token
	}

	const { data } = await apiFetch<ApiResponse<Cart>>('/cart', {
		method: 'POST',
		headers: { 'x-cart-token': token },
		body: JSON.stringify({ productId, quantity })
	})

	updateTag('cart')
	return data
}

export async function updateCartItem(
	itemId: string,
	quantity: number
): Promise<Cart> {
	const token = await getCartToken()
	if (!token) {
		throw new Error('No cart found')
	}

	const { data } = await apiFetch<ApiResponse<Cart>>(`/cart/${itemId}`, {
		method: 'PATCH',
		headers: { 'x-cart-token': token },
		body: JSON.stringify({ quantity })
	})

	updateTag('cart')
	return data
}

export async function removeCartItem(itemId: string): Promise<Cart> {
	const token = await getCartToken()
	if (!token) {
		throw new Error('No cart found')
	}

	const { data } = await apiFetch<ApiResponse<Cart>>(`/cart/${itemId}`, {
		method: 'DELETE',
		headers: { 'x-cart-token': token }
	})

	updateTag('cart')
	return data
}
