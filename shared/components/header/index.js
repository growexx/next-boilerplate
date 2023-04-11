import React from 'react'
import PropTypes from 'prop-types'
import { LogoutOutlined } from '@ant-design/icons'
import { signOut } from 'next-auth/react'
import { Tooltip } from 'antd'

import Avatar from '../avatar'
import Internationalization from '../Internationalization'
import { AvatarWrapper, StyledAppHeader, StyledAppHeaderColored } from './StyledAppHeader'
import { MenuItems } from './constants'

const Header = (props) =>
  props.menuBackground ? (
    <StyledAppHeaderColored {...props}>
      <AvatarWrapper>
        <Internationalization />
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
    </StyledAppHeaderColored>
  ) : (
    <StyledAppHeader {...props}>
      <AvatarWrapper>
        <Internationalization />
        <Avatar menu={MenuItems} />
      </AvatarWrapper>
      <Tooltip title="Log Out">
        <LogoutOutlined onClick={() => signOut()} />
      </Tooltip>
    </StyledAppHeader>
  )

Header.propTypes = {
  menuBackground: PropTypes.bool
}
export default Header
