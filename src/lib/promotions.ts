// src/lib/promotions.ts

import { cacheLife, cacheTag } from 'next/cache';
import { apiFetch } from './api';
import type { ApiResponse, Promotion } from './types';

export async function getPromotion() {
	'use cache';
	cacheLife('minutes');
	cacheTag('promotions');

	return apiFetch<ApiResponse<Promotion>>('/promotions');
}
