import Head from 'next/head'
import React from 'react'

import UserManagement from '@page-components/user-management'

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
