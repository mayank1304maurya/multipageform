import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

describe('App', () => {
	test('renders Form component', () => {
		render(<App />)

		const formElement = screen.getByText('Personal info')
		expect(formElement).toBeInTheDocument()

		const fullNameInput = screen.getByLabelText('Name') as HTMLInputElement
		expect(fullNameInput).toBeInTheDocument()

		const emailInput = screen.getByLabelText('Email Address') as HTMLInputElement
		expect(emailInput).toBeInTheDocument()

		const phoneInput = screen.getByLabelText('Phone Number') as HTMLInputElement
		expect(phoneInput).toBeInTheDocument()

		const nextButton = screen.getByRole('button', { name: 'Next Step' })
		expect(nextButton).toBeInTheDocument()
	})
})
