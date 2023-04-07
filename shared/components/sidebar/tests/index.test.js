import { render } from '@testing-library/react'

import SideBar from '../index'

describe('<SideBar />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<SideBar />)
    expect(firstChild).toMatchSnapshot()
  })
})
