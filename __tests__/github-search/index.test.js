import { render } from '@testing-library/react'

import GithubSearchPage from '@src/pages/github-search'

describe('<GithubSearchPage />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<GithubSearchPage />)

    expect(firstChild).toMatchSnapshot()
  })
})
