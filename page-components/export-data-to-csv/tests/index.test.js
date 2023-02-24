import { fireEvent, render, screen } from '@testing-library/react'

import ExportDataToCsv from '../index'

describe('<ExportDataToCsv />', () => {
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<ExportDataToCsv />)
    expect(firstChild).toMatchSnapshot()
  })
  it('should trigger export', () => {
    render(<ExportDataToCsv />)
    const checkbox = screen.getByRole('checkbox', { name: /select all/i })
    fireEvent.click(checkbox)
    render(<ExportDataToCsv />)
    const buttonElement = screen.getAllByTestId('ExportButton')
    fireEvent.click(buttonElement[0])
    expect(buttonElement[0].tagName).toEqual('BUTTON')
  })
})
