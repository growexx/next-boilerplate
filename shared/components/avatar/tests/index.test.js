import { render } from '@testing-library/react'

import Avatar from '../index'

describe('<Avatar />', () => {
  const stubProps = {
    menu: [
      {
        to: '/profile',
        tabName: 'Profile',
        icon: 'testIcon'
      }
    ]
  }

  it('should render a div', () => {
    const { container } = render(<Avatar {...stubProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
