import React from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from 'antd'
import Head from 'next/head'

const ExportDataToCsv = dynamic(() => import('@page-components/export-data-to-csv'), {
  loading: () => <Skeleton active />
})

const ExportDataPage = () => {
  return (
    <>
      <Head>
        <title>Export Data To CSV demo</title>
      </Head>
      <ExportDataToCsv />
    </>
  )
}

export default ExportDataPage
