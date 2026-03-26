// src/lib/products.ts

import { cacheLife, cacheTag } from 'next/cache';
import { apiFetch } from './api';
import type { ApiResponse, PaginatedResponse, Product, Stock } from './types';

export async function getProducts(params?: {
	page?: number;
	limit?: number;
	search?: string;
	category?: string;
	featured?: boolean;
}) {
	'use cache';
	cacheLife('hours');
	cacheTag('products');

	const searchParams = new URLSearchParams();
	if (params?.page) {
		searchParams.set('page', String(params.page));
	}
	if (params?.limit) {
		searchParams.set('limit', String(params.limit));
	}
	if (params?.search) {
		searchParams.set('search', params.search);
	}
	if (params?.category) {
		searchParams.set('category', params.category);
	}
	if (params?.featured) {
		searchParams.set('featured', 'true');
	}

	const query = searchParams.toString();
	const path = `/products${query ? `?${query}` : ''}`;

	return apiFetch<PaginatedResponse<Product>>(path);
}

export async function getProductBySlug(slug: string) {
	'use cache';
	cacheLife('hours');
	cacheTag('products');

	return apiFetch<ApiResponse<Product>>(`/products/${slug}`);
}

export async function getProductStock(productId: string) {
	return apiFetch<ApiResponse<Stock>>(`/products/${productId}/stock`);
}
