/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render } from '@testing-library/react'

import FooterWrapper from '../FooterWrapper'

describe('<Wrapper />', () => {
  it('should render an <footer> tag', () => {
    const { container } = render(<FooterWrapper />)
    expect(container.querySelector('footer')).not.toBeNull()
  })

  it('should have a class attribute', () => {
    const { container } = render(<FooterWrapper />)
    expect(container.querySelector('footer').hasAttribute('class')).toBe(true)
  })

  it('should adopt a valid attribute', () => {
    const id = 'test'
    const { container } = render(<FooterWrapper id={id} />)
    expect(container.querySelector('footer').id).toEqual(id)
  })

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<FooterWrapper attribute="test" />)
    expect(container.querySelector('footer').getAttribute('attribute')).toBeNull()
  })
})
