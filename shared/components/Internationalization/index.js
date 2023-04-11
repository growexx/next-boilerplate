import React from 'react'
import { Dropdown, Menu } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'

const getMenu = (MenuItems) => (
  <Menu>
    {MenuItems.locales.map((menuItem, index) => (
      <Menu.Item key={index}>
        <Link href={MenuItems.asPath} locale={menuItem}>
          {menuItem.toUpperCase()}
        </Link>
      </Menu.Item>
    ))}
  </Menu>
)

const Internationalization = () => {
  const router = useRouter()
  return (
    <Dropdown overlay={getMenu(router)}>
      <GlobalOutlined />
    </Dropdown>
  )
}

export default Internationalization

Internationalization.propTypes = {
  menu: PropTypes.array
}
