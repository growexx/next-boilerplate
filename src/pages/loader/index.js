import ListLoader from '@page-components/list-loader'
import Head from 'next/head'
import React from 'react'

const Loader = () => {
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

export default Loader
