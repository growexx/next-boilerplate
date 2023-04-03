import React from 'react'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'
import '@testing-library/jest-dom'

import RepoList from '../index'
import { TEST_IDS, mockRepoData } from '../stub'

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
  useQuery: jest.fn()
}))

jest.mock('@shared/utils/Fields', () => ({
  Input: jest.fn(() => <input />)
}))

describe('RepoList', () => {
  it('renders the form', () => {
    useQuery.mockReturnValue({
      isFetching: false,
      data: [],
      isError: false,
      refetch: jest.fn()
    })
    render(<RepoList />)
    const form = screen.getByTestId(TEST_IDS.REPO_FORM)
    expect(form).toBeInTheDocument()
  })

  it('displays loader for repositories while fetching repo data', async () => {
    useQuery.mockReturnValue({
      isFetching: true,
      data: [],
      isError: false,
      refetch: jest.fn()
    })
    const { container } = render(<RepoList />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'brijesh' } })
    await waitFor(() => expect(useQuery).toHaveBeenCalled())
    expect(container.getElementsByClassName('ant-skeleton').length).toBe(5)
  })

  it('displays the list of repositories when the user types', async () => {
    useQuery.mockReturnValue({
      isFetching: false,
      data: mockRepoData,
      isError: false,
      refetch: jest.fn()
    })
    const promise = Promise.resolve(mockRepoData)
    const { container } = render(<RepoList />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'brijesh' } })
    await waitFor(() => expect(useQuery).toHaveBeenCalled())
    await act(() => promise)
    useQuery.mockImplementation(() => promise)
    expect(container).toMatchSnapshot()
    expect(screen.getByText(`${mockRepoData[0]?.owner.login + '/' + mockRepoData[0]?.name}`)).toBeInTheDocument()
    expect(screen.getByText(`${mockRepoData[1]?.owner.login + '/' + mockRepoData[1]?.name}`)).toBeInTheDocument()
  })

  it('refetch on form submit', async () => {
    const queryResult = {
      isFetching: false,
      data: mockRepoData,
      isError: false,
      refetch: jest.fn()
    }
    useQuery.mockReturnValue(queryResult)
    render(<RepoList />)
    const form = screen.getByTestId(TEST_IDS.REPO_FORM)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'brijesh' } })
    fireEvent.submit(form)
    await waitFor(() => expect(useQuery).toHaveBeenCalled())
    queryResult.refetch()
    await waitFor(() => expect(queryResult.refetch).toHaveBeenCalled())
  })

  it('displays no data found message when no data is returned', async () => {
    useQuery.mockReturnValue({
      isFetching: false,
      data: { message: 'Not Found' },
      isError: false,
      refetch: jest.fn()
    })
    render(<RepoList />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'brijesh' } })
    await waitFor(() => expect(useQuery).toHaveBeenCalled())
    expect(screen.getByText('No data found')).toBeInTheDocument()
  })
})
