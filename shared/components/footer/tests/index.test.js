import { render } from '@testing-library/react'

import Footer from '../index'

describe('<Footer />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<Footer />)
    expect(firstChild).toMatchSnapshot()
  })
})
