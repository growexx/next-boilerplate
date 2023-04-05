import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import axiosInstance from '@shared/libs/axios'
import { usePost, fetchPost } from '../index'

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}))

jest.mock('@shared/libs/axios', () => ({
  get: jest.fn()
}))

describe('usePost', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calls useQuery with the correct parameters', () => {
    const postId = 123
    useQuery.mockReturnValue({ data: {}, isLoading: false, isError: false })
    renderHook(() => usePost(postId))
    expect(useQuery).toHaveBeenCalledWith(['getPost', postId], expect.any(Function))
  })

  it('calls fetchPost with the correct parameter', async () => {
    const postId = 123
    const mockData = { id: postId, title: 'Test Post' }
    axiosInstance.get.mockResolvedValue({ data: mockData })
    await fetchPost(postId)
    expect(axiosInstance.get).toHaveBeenCalledWith(`/posts/${postId}`)
  })
})
