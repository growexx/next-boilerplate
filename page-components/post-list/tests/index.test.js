import React from 'react'
import { render, screen } from '@testing-library/react'

import { usePosts } from '@shared/hooks/use-posts'
import PostList from '../index'

jest.mock('@shared/hooks/use-posts')

describe('PostList component', () => {
  it('renders posts when loaded', async () => {
    const mockPosts = [
      {
        id: 1,
        title: 'Post 1',
        body: 'Body of post 1'
      },
      {
        id: 2,
        title: 'Post 2',
        body: 'Body of post 2'
      }
    ]
    usePosts.mockReturnValue({
      isLoading: false,
      data: mockPosts
    })
    render(<PostList />)
    const postTitles = await screen.findAllByRole('heading', { level: 3 })
    expect(postTitles.length).toEqual(2)
    expect(postTitles[0]).toHaveTextContent(mockPosts[0].title)
    expect(postTitles[1]).toHaveTextContent(mockPosts[1].title)
    expect(screen.getByText(mockPosts[0].body)).toBeInTheDocument()
    expect(screen.getByText(mockPosts[1].body)).toBeInTheDocument()
  })
})
