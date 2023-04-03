import React from 'react'
import { Dropdown, Menu } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Link from 'next/link'

const getMenu = (MenuItems) => (
  <Menu>
    {MenuItems.map((menuItem, index) => (
      <Menu.Item key={index}>
        <Link href={menuItem.to}>{menuItem.tabName}</Link>
      </Menu.Item>
    ))}
  </Menu>
)
const Internationalization = (props) => (
  <Dropdown overlay={getMenu(props.menu)}>
    <GlobalOutlined />
  </Dropdown>
)

export default Internationalization

Internationalization.propTypes = {
  menu: PropTypes.array
}
