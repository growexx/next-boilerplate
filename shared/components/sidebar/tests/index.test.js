import { render } from '@testing-library/react'

import SideBar from '../index'

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
    } = render(<SideBar {...props} />)
    expect(firstChild).toMatchSnapshot()
  })
})
