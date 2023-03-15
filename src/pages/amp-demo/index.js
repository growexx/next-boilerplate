import React from 'react'
import { useAmp } from 'next/amp'

export const config = { amp: 'hybrid' }

const AmpDemoPage = () => {
  const isAmp = useAmp()
  return <div>{isAmp ? 'This is an AMP page' : 'This is a non-AMP page'}</div>
}

export default AmpDemoPage
