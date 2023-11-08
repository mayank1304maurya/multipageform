import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import FormInfo from '../pages/FormInfo/FormInfo'
import { FormContextProvider } from '../contexts/FormContext'

describe('FormInfo', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<FormContextProvider>
					<FormInfo />
				</FormContextProvider>
			</MemoryRouter>
		)
	})

	test('renders form with input fields', () => {
		expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
		expect(screen.getByLabelText('Email')).toBeInTheDocument()
		expect(screen.getByLabelText('Phone number')).toBeInTheDocument()
	})

	describe('error handling', () => {
		test('displays error messages when form fields are invalid', () => {
			const fullNameInput = screen.getByLabelText('Full Name') as HTMLInputElement
			const emailInput = screen.getByLabelText('Email') as HTMLInputElement
			const phoneInput = screen.getByLabelText('Phone number') as HTMLInputElement

			fireEvent.change(fullNameInput, { target: { value: 'AB' } })
			fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
			fireEvent.change(phoneInput, { target: { value: '123' } })

			expect(screen.getByText('Name must contain at least 3 letters')).toBeInTheDocument()
			expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
			expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument()
		})

		test('prevents moving to FormPlan without filling inputs', () => {
			const nextStepButton = screen.queryAllByText('Next Step')
			fireEvent.click(nextStepButton[0])

			expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
			expect(screen.getByLabelText('Email')).toBeInTheDocument()
			expect(screen.getByLabelText('Phone number')).toBeInTheDocument()
			expect(screen.queryByText('Plan')).not.toBeInTheDocument()
		})
	})
})
