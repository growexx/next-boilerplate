import { render } from '@testing-library/react'

import Sidebar from '../index'

const props = {
  user: {
    role: 1
  },
  collapsed: true
}

describe('<SideBar />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<Sidebar {...props} />)
    expect(firstChild).toMatchSnapshot()
  })
})
