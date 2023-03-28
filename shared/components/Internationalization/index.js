import React from 'react'
import { Dropdown, Menu } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { InternationalizationWrapper } from './StyledInternationalization'

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
  <InternationalizationWrapper>
    <Dropdown.Button overlay={getMenu(props.menu)} placement="bottom" icon={<GlobalOutlined />} />
  </InternationalizationWrapper>
)

export default Internationalization

Internationalization.propTypes = {
  menu: PropTypes.array
}
