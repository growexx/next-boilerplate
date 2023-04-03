import React from 'react'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { usePost } from '@shared/hooks/use-post'
import PostDetails from '../index'

jest.mock('@shared/hooks/use-post')
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('PostDetails', () => {
  const postData = {
    id: 1,
    title: 'Test Post',
    body: 'Lorem ipsum dolor sit amet'
  }

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: { id: '1' }
    }))

    usePost.mockReturnValue({
      data: postData,
      isLoading: false
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders the post title and body', () => {
    render(<PostDetails />)

    expect(screen.getByText(postData.title)).toBeInTheDocument()
    expect(screen.getByText(postData.body)).toBeInTheDocument()
  })

  it('renders the loading state', () => {
    usePost.mockReturnValue({
      data: null,
      isLoading: true
    })
    render(<PostDetails />)
    expect(document.getElementsByClassName('ant-skeleton-title')).toBeTruthy()
  })
})
