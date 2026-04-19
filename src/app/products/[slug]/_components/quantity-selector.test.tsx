// src/app/products/[slug]/_components/quantity-selector.test.tsx
// Tests for the QuantitySelector component

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import QuantitySelector from './quantity-selector'

describe('QuantitySelector', () => {
	it('disables decrease at quantity 1', () => {
		render(<QuantitySelector stock={10} quantity={1} onChange={() => {}} />)
		expect(screen.getByLabelText('Decrease quantity')).toBeDisabled()
	})

	it('disables increase at max stock', () => {
		render(<QuantitySelector stock={5} quantity={5} onChange={() => {}} />)
		expect(screen.getByLabelText('Increase quantity')).toBeDisabled()
	})

	it('shows max message at stock limit', () => {
		render(<QuantitySelector stock={3} quantity={3} onChange={() => {}} />)
		expect(screen.getByText(/max quantity reached/i)).toBeInTheDocument()
	})

	it('calls onChange with incremented value', async () => {
		const onChange = vi.fn()
		render(<QuantitySelector stock={10} quantity={2} onChange={onChange} />)
		await userEvent.click(screen.getByLabelText('Increase quantity'))
		expect(onChange).toHaveBeenCalledWith(3)
	})

	it('calls onChange with decremented value', async () => {
		const onChange = vi.fn()
		render(<QuantitySelector stock={10} quantity={3} onChange={onChange} />)
		await userEvent.click(screen.getByLabelText('Decrease quantity'))
		expect(onChange).toHaveBeenCalledWith(2)
	})
})
