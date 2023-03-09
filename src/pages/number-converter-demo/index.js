import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Skeleton } from 'antd'

const NumeralConversion = dynamic(() => import('@page-components/numeral-conversion'), {
  loading: () => <Skeleton active />
})

const NumberConverterDemoPage = () => {
  return (
    <>
      <Head>
        <title>Number Converter Demo</title>
      </Head>
      <NumeralConversion />
    </>
  )
}

export default NumberConverterDemoPage
