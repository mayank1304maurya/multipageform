import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import FormPlan from '../pages/FormPlan/FormPlan'
import { FormContextProvider } from '../contexts/FormContext'

describe('FormPlan', () => {
	beforeEach(() => {
		render(
			<MemoryRouter>
				<FormContextProvider>
					<FormPlan />
				</FormContextProvider>
			</MemoryRouter>
		)
	})

	test('renders plan options', () => {
		const planOptions = screen.getAllByRole('radio')
		expect(planOptions).toHaveLength(3)
	})

	test('selects a plan and toggles between monthly and yearly', () => {
		const selectPlan = (plan: string) => {
			const planOption = screen.getByText(plan)
			fireEvent.click(planOption)
		}

		const togglePeriod = () => {
			const yearlySwitch = screen.getByTestId('yearly-switch') as HTMLInputElement
			fireEvent.click(yearlySwitch)
		}

		// Select a plan
		selectPlan('Advanced')

		// Verify that the selected plan is marked as selected
		expect(screen.getByText('Advanced').closest('.plan__container')).toHaveClass('selected')

		// Toggle to yearly
		togglePeriod()

		// Verify that the yearly option is selected
		expect(screen.getByTestId('yearly-switch')).toBeChecked()

		// Verify that the monthly prices are hidden and the yearly prices are shown
		expect(screen.queryByText('9/mo')).not.toBeInTheDocument()
		expect(screen.queryByText('12/mo')).not.toBeInTheDocument()
		expect(screen.getByText('90/yr')).toBeInTheDocument()
		expect(screen.getByText('120/yr')).toBeInTheDocument()
		expect(screen.getByText('150/yr')).toBeInTheDocument()

		// Toggle back to monthly
		togglePeriod()

		// Verify that the monthly option is selected
		expect(screen.getByTestId('yearly-switch')).not.toBeChecked()

		// Verify that the yearly prices are hidden and the monthly prices are shown
		expect(screen.getByText('9/mo')).toBeInTheDocument()
		expect(screen.getByText('12/mo')).toBeInTheDocument()
		expect(screen.queryByText('90/yr')).not.toBeInTheDocument()
		expect(screen.queryByText('120/yr')).not.toBeInTheDocument()
		expect(screen.queryByText('150/yr')).not.toBeInTheDocument()
	})
})
