import React from 'react'
import { useAmp } from 'next/amp'
import Head from 'next/head'

export const config = { amp: 'hybrid' }

const AmpDemoPage = () => {
  const isAmp = useAmp()
  return (
    <>
      <Head>
        <title>Amp page demo</title>
      </Head>

      {isAmp ? 'This is an AMP page' : 'This is a non-AMP page'}
    </>
  )
}

export default AmpDemoPage
