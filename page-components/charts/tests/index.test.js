import { render } from '@testing-library/react'

import Charts from '../index'

describe('Check component:<Charts /> is rendering properly', () => {
  it('Should render and match the snapshot', () => {
    global.Date = jest.fn(() =>
      Object.assign(Date, {
        getTime: jest.fn(() => ({
          toString: jest.fn(() => ({
            slice: jest.fn(() => '000')
          }))
        }))
      })
    )
    global.Date.now = jest.fn(() => 1680090885502)
    const {
      container: { firstChild }
    } = render(<Charts />)
    expect(firstChild).toMatchSnapshot()
  })
})
