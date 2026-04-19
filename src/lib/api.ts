// src/lib/api.ts

import { serverEnv } from '@/env/server'

export async function apiFetch<T>(
	path: string,
	options?: RequestInit,
): Promise<T> {
	const url = `${serverEnv.API_BASE_URL}${path}`

	const headers: Record<string, string> = {
		'x-vercel-protection-bypass': serverEnv.VERCEL_PROTECTION_BYPASS,
	}

	if (options?.body) {
		headers['Content-Type'] = 'application/json'
	}

	const res = await fetch(url, {
		...options,
		headers: {
			...headers,
			...options?.headers,
		},
	})

	if (!res.ok) {
		const errorBody = await res.text()
		console.error('API error body:', errorBody)
		throw new Error(`API error ${res.status}: ${res.statusText} — ${url}`)
	}

	return res.json()
}