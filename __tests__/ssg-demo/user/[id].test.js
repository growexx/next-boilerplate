import React from 'react'
import { render, screen } from '@testing-library/react'

import UserInfo, { getStaticPaths, getStaticProps } from '@src/pages/ssg-demo/user/[id]'

describe('UserInfo Component', () => {
  const props = {
    data: {
      firstName: 'Test'
    }
  }

  it('renders the component with the correct props', () => {
    render(<UserInfo {...props} />)
    const heading = screen.getByRole('heading', { name: /profile of test/i })
    expect(heading).toBeInTheDocument()
  })

  it('returns correct paths', async () => {
    const dummyData = {
      users: [{ id: 1 }, { id: 2 }]
    }
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(dummyData)
      })
    )
    const expectedPaths = [{ params: { id: '1' } }, { params: { id: '2' } }]
    const result = await getStaticPaths()
    expect(result.paths).toEqual(expectedPaths)
  })

  it('returns correct props', async () => {
    const dummyData = {
      firstName: 'Test'
    }
    const context = {
      params: {
        id: '1'
      }
    }
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(dummyData)
      })
    )
    const result = await getStaticProps(context)
    expect(result.props.data).toEqual(dummyData)
  })
})
