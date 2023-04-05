import React from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Skeleton } from 'antd'

const UserManagement = dynamic(() => import('@page-components/user-management'), {
  loading: () => <Skeleton paragraph={{ rows: 20 }} />
})

const UsersPage = () => {
  return (
    <>
      <Head>
        <title>User Management</title>
      </Head>
      <div>
        <UserManagement />
      </div>
    </>
  )
}

export default UsersPage
