import React from 'react'
import { Layout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { ROUTES } from '@shared/constants'
import GrowExxTriangleLogo from '@assets/images/Growexx-Triangle-White.png'
import GrowExxLogo from '@assets/images/GrowExx_Group_Logo.png'
import { ToggleBreadCrumb } from './StyledMainLayout'
import { getUserData } from '@shared/utils/helper'

import { GET_FILTERED_MENU_ITEM } from '@shared/components/sidebar/constants'

// TODO: add loader support
const Footer = dynamic(() => import('@shared/components/footer'), {})
const Sidebar = dynamic(() => import('@shared/components/sidebar'), {})
const AppHeader = dynamic(() => import('@shared/components/header'), {})

const { Header, Content } = Layout

const LogoContainer = styled.div`
  background: #190426;
  flex: 0 0 200px;
  max-width: 200px;
  min-width: 200px;
  width: 200px;
  text-align: center;
`

const HeaderMenu = styled(Menu)`
  display: flex;
  align-items: center;
`

const HeaderMenuItem = styled(Menu.Item)`
  margin: 0 !important;
  width: fit-content !important;
`

const LayoutWrapper = styled(Layout)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Layouts = ({ layoutVariant, collapsed, toggle, children, user }) => {
  const router = useRouter()

  switch (layoutVariant) {
    case 2:
      return (
        <LayoutWrapper>
          <Header>
            <LogoContainer className="logo">
              <Link href={ROUTES.HOME}>
                {!collapsed ? <Image src={GrowExxLogo} alt="logo" /> : <Image src={GrowExxTriangleLogo} alt="logo" />}
              </Link>
            </LogoContainer>
            <AppHeader />
          </Header>
          <Layout className="site-layout">
            <Sidebar collapsed={collapsed} user={getUserData()} layoutVariant={layoutVariant} />
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280
              }}
            >
              {children}
            </Content>
          </Layout>
          <Footer />
        </LayoutWrapper>
      )
    case 3:
      return (
        <LayoutWrapper>
          <Header>
            <LogoContainer className="logo">
              <Link href={ROUTES.HOME}>{<Image src={GrowExxLogo} alt="logo" />}</Link>
            </LogoContainer>
            <HeaderMenu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]} selectedKeys={[router.pathname]}>
              {/* TODO: pass user role */}
              {GET_FILTERED_MENU_ITEM(true).map((menu) => (
                <HeaderMenuItem key={menu.to} icon={menu.icon}>
                  <Link href={menu.to} />
                </HeaderMenuItem>
              ))}
            </HeaderMenu>
            <AppHeader menuBackground />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            {children}
          </Content>
          <Footer />
        </LayoutWrapper>
      )
    default:
      return (
        <LayoutWrapper>
          <Sidebar collapsed={collapsed} user={getUserData()} layoutVariant={layoutVariant} />
          <Layout className="site-layout">
            <Header style={{ background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <ToggleBreadCrumb>
                <span
                  className="sideBarTrigger"
                  onClick={toggle}
                  data-testid="ToggleIcon"
                  onKeyDown={toggle}
                  role="button"
                  tabIndex={0}
                  aria-label="Navigation Toggle"
                >
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </span>
              </ToggleBreadCrumb>
              <AppHeader />
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280
              }}
            >
              {children}
            </Content>
            <Layout className="site-layout">
              <Footer />
            </Layout>
          </Layout>
        </LayoutWrapper>
      )
  }
}

Layouts.propTypes = {
  layoutVariant: PropTypes.number,
  collapsed: PropTypes.bool,
  toggle: PropTypes.func,
  location: PropTypes.object,
  user: PropTypes.object,
  children: PropTypes.node
}

export default Layouts
