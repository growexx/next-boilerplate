import { render } from '@testing-library/react'

import FeaturePage from '@page-components/feature-page'

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const {
      container: { firstChild }
    } = render(<FeaturePage />)

    expect(firstChild).toMatchSnapshot()
  })
})
