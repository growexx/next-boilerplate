import React from 'react'
import { render, screen } from '@testing-library/react'

import ISRDemoPage, { getStaticProps } from '@src/pages/isr-demo'
import { API_ENDPOINTS } from '@shared/constants'

describe('ISRDemoPage', () => {
  const mockData = [
    {
      _id: '1',
      name: 'John Doe',
      address: '123 Main St'
    },
    {
      _id: '2',
      name: 'Jane Doe',
      address: '456 Elm St'
    }
  ]

  it('should render the page with user data', () => {
    render(<ISRDemoPage data={mockData} />)
    expect(screen.getByText('John Doe - 123 Main St')).toBeInTheDocument()
    expect(screen.getByText('Jane Doe - 456 Elm St')).toBeInTheDocument()
  })

  it('should fetch data from the API endpoint', async () => {
    const mockResponse = { data: mockData }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse)
      })
    )
    const { props, revalidate } = await getStaticProps()
    expect(props).toEqual({ data: { data: mockData } })
    expect(window.fetch).toHaveBeenCalledWith(API_ENDPOINTS.STUDENT_ISR_API)
    expect(revalidate).toEqual(10)

    window.fetch.mockRestore()
  })
})
