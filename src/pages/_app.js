import React from 'react'
import PropTypes from 'prop-types'
import { Open_Sans } from '@next/font/google'
import dynamic from 'next/dynamic'
import { Spin } from 'antd'

import GlobalStyle from 'styles/global-styles'
import '../styles/globals.css'

// TODO: add proper loader
const MainLayout = dynamic(() => import('@shared/components/layouts/main-layout'), {
  loading: () => <Spin spinning size="default" />,
  ssr: false
})

const openSans = Open_Sans({
  weight: '400',
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <main className={openSans.className}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      <GlobalStyle />
    </main>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}
