import React from 'react'
import { useLocation } from 'react-router-dom'

type Page = {
	path: string
	title: string
}

const StepNavigator = () => {
	const location = useLocation()

	const pages: Page[] = [
		{
			path: '/',
			title: 'YOUR INFO',
		},
		{
			path: '/plan',
			title: 'SELECT PLAN',
		},
		{
			path: '/addons',
			title: 'ADD-ONS',
		},
		{
			path: '/summary',
			title: 'SUMMARY',
		},
	]

	const activePage: Page | undefined =
		location.pathname === '/thanks'
			? pages.find(page => page.path === '/summary')
			: pages.find(page => page.path === location.pathname)

	return (
		<aside className='progress-bar'>
			<div className='progress-bar__steps'>
				{pages.map((page, index) => (
					<div className='progress-bar__step' key={index}>
						<div className={`progress-bar__step-index ${page === activePage ? 'active' : ''}`}>{index + 1}</div>
						<div className='progress-bar__step-content'>
							<p className='progress-bar__step-number'>STEP {index + 1}</p>
							<h2 className='progress-bar__step-title'>{page.title}</h2>
						</div>
					</div>
				))}
			</div>
		</aside>
	)
}

export default StepNavigator
