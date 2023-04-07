import { render } from '@testing-library/react'

import SignInPage from '@src/pages/sign-in'

describe('<SignInPage />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<SignInPage />)

    expect(firstChild).toMatchSnapshot()
  })
})
