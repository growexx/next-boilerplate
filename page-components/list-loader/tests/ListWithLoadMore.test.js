import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import request from '@shared/utils/request'
import ListWithLoadMore from '../ListWithLoadMore'

jest.mock('@shared/utils/request')

describe('<ListWithLoadMore />', () => {
  const promise = Promise.resolve({
    status: 1,
    results: [
      {
        email: 'test@example.com',
        gender: 'male',
        name: {
          first: 'test',
          last: 'test',
          title: 'test'
        }
      }
    ]
  })

  it('should render and match the snapshot', async () => {
    request.mockImplementation(() => promise)
    const {
      container: { firstChild }
    } = render(<ListWithLoadMore />)
    await act(() => promise)
    expect(firstChild).toMatchSnapshot()
  })

  it('call Load More', async () => {
    request.mockImplementation(() => promise)
    render(<ListWithLoadMore />)
    await waitFor(() => expect(request).toHaveBeenCalledTimes(2))
    await act(() => promise)
    fireEvent.click(screen.getByRole('button', { name: 'load-more' }))
    await waitFor(() => expect(request).toHaveBeenCalled())
  })
})
