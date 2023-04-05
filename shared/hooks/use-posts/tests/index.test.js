import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import axiosInstance from '@shared/libs/axios'
import { usePosts, fetchPosts } from '../index'

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}))

jest.mock('@shared/libs/axios', () => ({
  get: jest.fn()
}))

describe('usePosts', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls useQuery with the correct parameters', () => {
    const limit = 10
    useQuery.mockReturnValue({ data: {}, isLoading: false, isError: false })
    renderHook(() => usePosts(limit))
    expect(useQuery).toHaveBeenCalledWith(['getPosts'], expect.any(Function))
  })

  it('calls fetchPosts with the correct parameter', async () => {
    const limit = 10
    const mockData = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' }
    ]
    axiosInstance.get.mockResolvedValue({ data: mockData })
    await fetchPosts(limit)
    expect(axiosInstance.get).toHaveBeenCalledWith(`/posts?_limit=${limit}`)
  })
})
