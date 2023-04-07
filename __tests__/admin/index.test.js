import { render } from '@testing-library/react'

import AdminPage from '@src/pages/admin'

describe('<AdminPage />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<AdminPage />)

    expect(firstChild).toMatchSnapshot()
  })
})
