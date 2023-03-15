import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'

import { RepoList } from '../index'

const mockRepoData = [
  {
    id: 2618963,
    node_id: 'MDEwOlJlcG9zaXRvcnkyNjE4OTYz',
    name: 'AFNetworking',
    full_name: 'js/AFNetworking',
    private: false,
    owner: {
      login: 'js',
      id: 23626
    }
  },
  {
    id: 459905452,
    node_id: 'R_kgDOG2mZrA',
    name: 'analytics-ios-integration-mixpanel',
    full_name: 'js/analytics-ios-integration-mixpanel',
    private: false,
    owner: {
      login: 'js',
      id: 23626
    }
  }
]

// Mock the fetch function and return a mock response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockRepoData)
  })
)

// Mocking react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn(),
    formState: {
      errors: {}
    },
    control: {},
    watch: jest.fn()
  }))
}))

// Mocking useQuery
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    isFetching: false,
    data: mockRepoData,
    isError: false,
    refetch: jest.fn()
  }))
}))

jest.mock('@shared/utils/Fields', () => ({
  Input: jest.fn(() => <input />)
}))

describe('RepoList', () => {
  it('renders the form', () => {
    render(<RepoList />)
    const form = screen.getByTestId('repo-form')
    expect(form).toBeInTheDocument()
  })

  it('displays the list of repositories when the user types', async () => {
    const { container } = render(<RepoList />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'brijesh' } })
    await waitFor(() => expect(useQuery).toHaveBeenCalled())
    expect(container).toMatchSnapshot()
    expect(screen.getByText(`${mockRepoData[0]?.owner.login + '/' + mockRepoData[0]?.name}`)).toBeInTheDocument()
    expect(screen.getByText(`${mockRepoData[1]?.owner.login + '/' + mockRepoData[1]?.name}`)).toBeInTheDocument()
  })
})
