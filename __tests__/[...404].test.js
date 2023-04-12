import React from 'react'
import { render, screen } from '@testing-library/react'

import NotFound from '@src/pages/[...404]'

describe('404 page', () => {
  test('renders 404 status', () => {
    render(<NotFound />)
    const statusElement = screen.getByText('404')
    expect(statusElement).toBeInTheDocument()
  })

  test('renders correct subtitle', () => {
    render(<NotFound />)
    const subtitleElement = screen.getByText('Sorry, the page you visited does not exist or you are not authorized to access this page.')
    expect(subtitleElement).toBeInTheDocument()
  })

  test('renders Back Home link', () => {
    render(<NotFound />)
    const linkElement = screen.getByText('Back Home')
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/')
  })
})
