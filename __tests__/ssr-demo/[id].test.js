import { render } from '@testing-library/react'

import PostDetailsPage from '@src/pages/ssr-demo/[id]'

describe('<PostDetailsPage />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<PostDetailsPage />)

    expect(firstChild).toMatchSnapshot()
  })
})
