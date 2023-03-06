import Head from 'next/head'
import React from 'react'
import { Skeleton } from 'antd'
import dynamic from 'next/dynamic'

const Charts = dynamic(() => import('@page-components/charts'), {
  loading: () => <Skeleton active />
})

const ChartsPage = () => {
  return (
    <>
      <Head>
        <title>Charts demo</title>
      </Head>
      <Charts />
    </>
  )
}

export default ChartsPage
