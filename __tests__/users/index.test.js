import { render } from '@testing-library/react'

import UsersPage from '@src/pages/users'

describe('<UsersPage />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<UsersPage />)

    expect(firstChild).toMatchSnapshot()
  })
})
