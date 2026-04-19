// src/lib/store-config.ts

import { cacheLife, cacheTag } from 'next/cache'
import { apiFetch } from './api'
import type { ApiResponse, StoreConfig } from './types'

export async function getStoreConfig() {
	'use cache'
	cacheLife('max')
	cacheTag('store-config')

	return apiFetch<ApiResponse<StoreConfig>>('/store/config')
}
