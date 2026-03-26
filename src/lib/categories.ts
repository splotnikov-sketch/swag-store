// src/lib/categories.ts

import { cacheLife, cacheTag } from 'next/cache';
import { apiFetch } from './api';
import type { ApiResponse, Category } from './types';

export async function getCategories() {
	'use cache';
	cacheLife('days');
	cacheTag('categories');

	return apiFetch<ApiResponse<Category[]>>('/categories');
}
