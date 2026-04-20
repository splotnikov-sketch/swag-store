// /src/components/layout/current-year.tsx

import { connection } from 'next/server'

export async function CurrentYear() {
	await connection()
	return <>{new Date().getFullYear()}</>
}
