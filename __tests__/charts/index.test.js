import { render } from '@testing-library/react'

import ChartsPage from '@src/pages/charts'

describe('<ChartsPage />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<ChartsPage />)

    expect(firstChild).toMatchSnapshot()
  })
})
