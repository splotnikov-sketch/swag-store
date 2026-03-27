// /src/components/layout/current-year.tsx

'use client'
export function CurrentYear() {
    return <>{new Date().getFullYear()}</>
}