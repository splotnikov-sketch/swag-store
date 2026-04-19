import { z } from 'zod'

const serverEnvSchema = z.object({
	API_BASE_URL: z.url(),
	VERCEL_PROTECTION_BYPASS: z.string().min(1),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
})

export const serverEnv = serverEnvSchema.parse({
	API_BASE_URL: process.env.API_BASE_URL,
	VERCEL_PROTECTION_BYPASS: process.env.VERCEL_PROTECTION_BYPASS,
	NODE_ENV: process.env.NODE_ENV
})
