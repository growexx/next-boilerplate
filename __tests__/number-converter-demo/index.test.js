import { render } from '@testing-library/react'

import NumeralConversion from '@src/pages/number-converter-demo'

describe('<NumeralConversion />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<NumeralConversion />)

    expect(firstChild).toMatchSnapshot()
  })
})
