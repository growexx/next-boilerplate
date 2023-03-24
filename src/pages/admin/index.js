import React from 'react'
import Head from 'next/head'

const AdminPage = () => {
  return (
    <>
      <Head>
        <title>Admin page</title>
      </Head>
      This is Admin Page, Only Role with admin role is allowed to access this page
    </>
  )
}

export default AdminPage
