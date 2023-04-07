import { act, render, waitFor } from '@testing-library/react'
import request from '@shared/utils/request'
import ListWithInfiniteLoader from '../ListWithInfiniteLoader'

jest.mock('@shared/utils/request')

describe('<ListWithInfiniteLoader />', () => {
  it('should render and match the snapshot', async () => {
    const promise = Promise.resolve({ status: 1 })
    request.mockImplementation(() => promise)
    const {
      container: { firstChild }
    } = render(<ListWithInfiniteLoader />)
    await act(() => promise)
    expect(firstChild).toMatchSnapshot()
    expect(firstChild).toBeInTheDocument()
  })

  it('should render and match the snapshot', async () => {
    const promise = Promise.resolve({
      status: 1,
      results: [
        {
          name: {
            last: 'testInfiniteLoader',
            email: 'test@234.com'
          }
        }
      ]
    })
    request.mockImplementation(() => promise)
    const {
      container: { firstChild }
    } = render(<ListWithInfiniteLoader />)
    await act(() => promise)
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2))
    expect(firstChild).toMatchSnapshot()
  })
})
