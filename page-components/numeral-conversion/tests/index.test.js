import { render, screen, fireEvent } from '@testing-library/react'
import NumeralConversion from '../index'

describe('NumeralConversion', () => {
  it('renders Numbers table', () => {
    const { container: firstChild } = render(<NumeralConversion />)
    const numbersTable = screen.getByRole('table', { name: /numbers/i })
    expect(numbersTable).toBeInTheDocument()
    expect(firstChild).toMatchSnapshot()
  })

  it('updates value on search', () => {
    render(<NumeralConversion />)
    const input = screen.getByPlaceholderText(/enter number to convert/i)
    const searchButton = screen.getByRole('button', { name: /go/i })
    fireEvent.change(input, { target: { value: '123' } })
    fireEvent.click(searchButton)
    expect(input).toHaveValue('123')
  })
})
