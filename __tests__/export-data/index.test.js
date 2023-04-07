import { render } from '@testing-library/react'

import ExportDataPage from '@src/pages/export-data'

describe('<ExportDataPage />', () => {
  it('should match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<ExportDataPage />)

    expect(firstChild).toMatchSnapshot()
  })
})
