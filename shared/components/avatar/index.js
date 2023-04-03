import React from 'react'
import { Dropdown, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Link from 'next/link'

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
  <Dropdown overlay={getMenu(props.menu)}>
    <UserOutlined />
  </Dropdown>
)

export default Avatar

Avatar.propTypes = {
  menu: PropTypes.array
}
