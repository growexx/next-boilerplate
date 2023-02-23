import { render, screen } from '@testing-library/react'

import ListWithPagination from '../ListWithPagination'

jest.mock('@shared/utils/request')

describe('<ListWithPagination />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<ListWithPagination />)

    expect(screen.getByText('ant design part 0')).toBeInTheDocument()
    expect(firstChild).toMatchSnapshot()
  })
})
