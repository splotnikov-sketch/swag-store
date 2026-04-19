// src/app/products/[slug]/_components/add-to-cart-button.test.tsx
// Tests for the AddToCartButton component

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import AddToCartButton from './add-to-cart-button'

describe('AddToCartButton', () => {
	it('shows "Add to Cart" when in stock', () => {
		render(<AddToCartButton inStock={true} onAdd={async () => {}} />)
		expect(screen.getByText('Add to Cart')).toBeInTheDocument()
	})

	it('shows "Out of Stock" and is disabled when not in stock', () => {
		render(<AddToCartButton inStock={false} onAdd={async () => {}} />)
		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
		expect(screen.getByText('Out of Stock')).toBeInTheDocument()
	})

	it('calls onAdd when clicked', async () => {
		const onAdd = vi.fn().mockResolvedValue(undefined)
		render(<AddToCartButton inStock={true} onAdd={onAdd} />)
		await userEvent.click(screen.getByText('Add to Cart'))
		expect(onAdd).toHaveBeenCalledOnce()
	})

	it('shows "Added!" after successful add', async () => {
		const onAdd = vi.fn().mockResolvedValue(undefined)
		render(<AddToCartButton inStock={true} onAdd={onAdd} />)
		await userEvent.click(screen.getByText('Add to Cart'))
		expect(screen.getByText('Added!')).toBeInTheDocument()
	})
})
