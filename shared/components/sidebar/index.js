import React from 'react'
import { Layout, Menu } from 'antd'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ROUTES, showLogoInSideBar } from '@shared/constants'
import GrowExxTriangleLogo from '@assets/images/Growexx-Triangle-White.png'
import GrowExxLogo from '@assets/images/GrowExx_Group_Logo.png'
import { GET_FILTERED_MENU_ITEM } from './constants'

const { Sider } = Layout

const SideBar = ({ collapsed, layoutVariant }) => {
  const router = useRouter()
  const Logo = !collapsed ? <Image src={GrowExxLogo} alt="logo" /> : <Image src={GrowExxTriangleLogo} alt="logo" />
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} id="components-layout-demo-custom-trigger">
      {showLogoInSideBar(layoutVariant) ? (
        <div className="logo">
          <Link href={ROUTES.HOME}>{Logo}</Link>
        </div>
      ) : null}
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]} selectedKeys={[router.pathname]}>
        {/* TODO: */}
        {GET_FILTERED_MENU_ITEM(true).map((menu) => (
          <Menu.Item key={menu.to} icon={menu.icon}>
            <Link href={menu.to}>{menu.tabName}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}

export default SideBar

SideBar.propTypes = {
  collapsed: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  layoutVariant: PropTypes.number
}
