import { render, screen } from '@testing-library/react'
import Home from '@src/pages'
import FeaturePage from 'page-components/FeaturePage'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i
    })

    expect(heading).toBeInTheDocument()
  })
})

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const {
      container: { firstChild }
    } = render(<FeaturePage />)

    expect(firstChild).toMatchSnapshot()
  })
})
