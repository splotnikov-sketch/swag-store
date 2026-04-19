// /lib/types.ts

// Product types
export type Product = {
	id: string
	name: string
	slug: string
	description: string
	price: number // in cents
	currency: string
	category: string
	images: string[]
	featured: boolean
	tags: string[]
	createdAt: string
}

// Category types
export type Category = {
	slug: string
	name: string
	productCount: number
}

// Stock types
export type Stock = {
	productId: string
	stock: number
	inStock: boolean
	lowStock: boolean
}

// Promotion types
export type Promotion = {
	id: string
	title: string
	description: string
	discountPercent: number
	code: string
	validFrom: string
	validUntil: string
	active: boolean
}

// Cart types
export type CartItem = {
	productId: string
	quantity: number
	addedAt: string
	product: Product
	lineTotal: number // in cents
}

export type Cart = {
	token: string
	items: CartItem[]
	totalItems: number
	subtotal: number // in cents
	currency: string
	createdAt: string
	updatedAt: string
}

// Store config types
export type StoreConfig = {
	storeName: string
	currency: string
	features: {
		wishlist: boolean
		productComparison: boolean
		reviews: boolean
		liveChat: boolean
		recentlyViewed: boolean
	}
	socialLinks: {
		twitter: string
		github: string
		discord: string
	}
	seo: {
		defaultTitle: string
		titleTemplate: string
		defaultDescription: string
	}
}

// API response wrappers
export type ApiResponse<T> = {
	success: boolean
	data: T
}

export type PaginatedResponse<T> = {
	success: boolean
	data: T[]
	meta: {
		pagination: {
			page: number
			limit: number
			total: number
			totalPages: number
			hasNextPage: boolean
			hasPreviousPage: boolean
		}
	}
}
