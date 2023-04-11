import React from 'react'
import { render, screen } from '@testing-library/react'

import UserPage, { getStaticProps } from '@src/pages/ssg-demo/user'
import { API_ENDPOINTS } from '@shared/constants'

describe('UserPage', () => {
  it('renders without crashing', () => {
    render(<UserPage data={{ users: [] }} />)
  })

  it('displays user data correctly', () => {
    const data = {
      users: [
        { id: 1, firstName: 'John' },
        { id: 2, firstName: 'Jane' }
      ]
    }
    render(<UserPage data={data} />)
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
  })

  it('calls the API endpoint correctly', async () => {
    const mockData = { users: [] }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    )

    const { props } = await getStaticProps()
    expect(global.fetch).toHaveBeenCalledWith(API_ENDPOINTS.DUMMY_USER)
    expect(props.data).toEqual(mockData)

    global.fetch.mockRestore()
  })
})
