import { render } from '@testing-library/react'

import SsrDemoPage from '@src/pages/ssr-demo'

describe('<SsrDemoPage />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<SsrDemoPage />)

    expect(firstChild).toMatchSnapshot()
  })
})
