import LoaderPage from '@src/pages/loader'

import { render } from '@testing-library/react'

describe('<LoaderPage />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<LoaderPage />)

    expect(firstChild).toMatchSnapshot()
  })
})
