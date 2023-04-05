import React from 'react'
import { Dropdown, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { AvatarWrapper } from './StyledAvatar'

const getMenu = (MenuItems) => (
  <Menu>
    {MenuItems.map((menuItem, index) => (
      <Menu.Item key={index} icon={menuItem.icon}>
        <Link href={menuItem.to}>{menuItem.tabName}</Link>
      </Menu.Item>
    ))}
  </Menu>
)
const Avatar = (props) => (
  <AvatarWrapper>
    <Dropdown overlay={getMenu(props.menu)}>
      <UserOutlined />
    </Dropdown>
  </AvatarWrapper>
)

export default Avatar

Avatar.propTypes = {
  menu: PropTypes.array
}
