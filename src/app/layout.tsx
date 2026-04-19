import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { clientEnv } from '@/env/client'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { getCart } from '@/lib/cart'
import { CartProvider } from '@/components/cart/store/cart-provider'
import { Suspense } from 'react'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const description = 'Swag Store merchandise.'

export const metadata: Metadata = {
	title: {
		default: clientEnv.NEXT_PUBLIC_APP_NAME,
		template: `%s | ${clientEnv.NEXT_PUBLIC_APP_NAME}`,
	},
	description,
	metadataBase: new URL(clientEnv.NEXT_PUBLIC_APP_URL),
	openGraph: {
		title: clientEnv.NEXT_PUBLIC_APP_NAME,
		description,
		type: 'website',
		siteName: clientEnv.NEXT_PUBLIC_APP_NAME,
	},
}

async function CartProviderWrapper({ children }: { children: React.ReactNode }) {
	const cart = await getCart()
	return <CartProvider cart={cart}>{children}</CartProvider>
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="flex min-h-full flex-col">
				<Suspense>
					<CartProviderWrapper>
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</CartProviderWrapper>
				</Suspense>
			</body>
		</html>
	)
}