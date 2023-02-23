import { act, render } from '@testing-library/react'

import ListLoader from '../index'
import request from '@shared/utils/request'

jest.mock('@shared/utils/request')

describe('<ListLoader />', () => {
  it('should render and match the snapshot', async () => {
    const promise = Promise.resolve({ status: 1 })
    request.mockImplementation(() => promise)
    const {
      container: { firstChild }
    } = render(<ListLoader />)
    await act(() => promise)
    expect(firstChild).toMatchSnapshot()
  })
})
