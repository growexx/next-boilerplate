import React from 'react'
import PropTypes from 'prop-types'

// import Notification from 'components/Notification'
// import Cart from 'components/Cart'
import { AvatarWrapper, StyledAppHeader, StyledAppHeaderColored } from './StyledAppHeader'
import Avatar from '../avatar'
import { MenuItems } from './constants'

const Header = (props) =>
  props.menuBackground ? (
    <StyledAppHeaderColored {...props}>
      <AvatarWrapper>
        {/* TODO: */}
        {/* <Cart /> */}
        {/* <Notification /> */}
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
    </StyledAppHeaderColored>
  ) : (
    <StyledAppHeader {...props}>
      <AvatarWrapper>
        {/* TODO: */}
        {/* <Cart /> */}
        {/* <Notification /> */}
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
    </StyledAppHeader>
  )

Header.propTypes = {
  menuBackground: PropTypes.bool
}
export default Header
