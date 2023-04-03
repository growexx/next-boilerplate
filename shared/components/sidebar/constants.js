import React from 'react'
import {
  UserOutlined,
  SmileOutlined,
  LoadingOutlined,
  ExportOutlined,
  NumberOutlined,
  FormOutlined,
  LockOutlined,
  PieChartOutlined,
  MessageOutlined,
  ShoppingOutlined,
  SearchOutlined,
  CloudServerOutlined,
  GlobalOutlined
} from '@ant-design/icons'

import { ROUTES } from '@shared/constants'
// import { ROUTES, ROLE_BASED_SIDEBAR_MENU, ROLES, RESTRICTED_ROUTES } from 'containers/constants'

export const MenuItems = [
  {
    to: ROUTES.HOME,
    tabName: 'Home',
    icon: <SmileOutlined />
  },
  {
    to: ROUTES.SAMPLE_FORM,
    tabName: 'Redux-Saga Form',
    icon: <FormOutlined />
  },
  {
    to: ROUTES.LOADER,
    tabName: 'Loader Demo',
    icon: <LoadingOutlined />
  },
  {
    to: ROUTES.EXPORT_DATA,
    tabName: 'Export Data To CSV',
    icon: <ExportOutlined />
  },
  {
    to: ROUTES.NUMERAL_CONVERTER,
    tabName: 'Number Conversion Demo',
    icon: <NumberOutlined />
  },
  {
    to: ROUTES.USERS,
    tabName: 'User Management',
    icon: <UserOutlined />
  },
  {
    to: ROUTES.GITHUB_SEARCH,
    tabName: 'Github Search',
    icon: <SearchOutlined />
  },
  {
    to: ROUTES.TEST_ADMIN_PAGE,
    tabName: 'Admin Page',
    icon: <LockOutlined />
  },
  {
    to: ROUTES.CHARTS,
    tabName: 'Charts',
    icon: <PieChartOutlined />
  },
  {
    to: ROUTES.MULTI_TAB_SUPPORT,
    tabName: 'Multi Tab Communication',
    icon: <MessageOutlined />
  },
  {
    to: ROUTES.PRODUCTS,
    tabName: 'Products',
    icon: <ShoppingOutlined />
  },
  {
    to: ROUTES.SSR_DEMO,
    tabName: 'SSR Demo',
    icon: <CloudServerOutlined />
  },
  {
    to: ROUTES.INTERNATIONALIZATION_DEMO,
    tabName: 'Internationalization Demo',
    icon: <GlobalOutlined />
  }
]

/**
 * Filters Sidebar menu based on role
 * @param {string} role
 */
// export const GET_FILTERED_MENU_ITEM = role =>
//   MenuItems.filter(item =>
//     // Check if route is private then role has access to it
//     RESTRICTED_ROUTES.includes(item.to)
//       ? ROLE_BASED_SIDEBAR_MENU[role || ROLES.USER].includes(item.to)
//       : true,
//   );
// TODO: add user based menu
export const GET_FILTERED_MENU_ITEM = (role) => MenuItems
