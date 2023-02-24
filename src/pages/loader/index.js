import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Skeleton } from 'antd'

const ListLoader = dynamic(() => import('@page-components/list-loader'), {
  loading: () => <Skeleton active paragraph={{ rows: 10 }} />
})

const LoaderPage = () => {
  return (
    <>
      <Head>
        <title>Loader Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListLoader />
    </>
  )
}

export default LoaderPage
