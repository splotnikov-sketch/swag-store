import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Suspense } from 'react'
import { CartProvider } from '@/components/cart/store/cart-provider'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { clientEnv } from '@/env/client'
import { getCart } from '@/lib/cart'
import { getStoreConfig } from '@/lib/store-config'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export async function generateMetadata(): Promise<Metadata> {
	const { data: config } = await getStoreConfig()
	return {
		title: {
			default: config.seo.defaultTitle,
			template: config.seo.titleTemplate
		},
		description: config.seo.defaultDescription,
		metadataBase: new URL(clientEnv.NEXT_PUBLIC_APP_URL),
		openGraph: {
			title: config.seo.defaultTitle,
			description: config.seo.defaultDescription,
			type: 'website',
			siteName: config.storeName
		}
	}
}

async function CartProviderWrapper({
	children
}: {
	children: React.ReactNode
}) {
	const cart = await getCart()
	return <CartProvider cart={cart}>{children}</CartProvider>
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-w-[320px] flex min-h-full flex-col">
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
