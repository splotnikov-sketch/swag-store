// src/lib/api.ts

import { serverEnv } from '@/env/server';

export async function apiFetch<T>(
	path: string,
	options?: RequestInit,
): Promise<T> {
	const url = `${serverEnv.API_BASE_URL}${path}`;

	const res = await fetch(url, {
		...options,
		headers: {
			'x-vercel-protection-bypass': serverEnv.VERCEL_PROTECTION_BYPASS,
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});

	if (!res.ok) {
		throw new Error(`API error ${res.status}: ${res.statusText} — ${url}`);
	}

	return res.json();
}
