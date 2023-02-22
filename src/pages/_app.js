import React from 'react'
import PropTypes from 'prop-types'
import { Open_Sans } from '@next/font/google'

import MainLayout from '@shared/components/layouts/main-layout'
import GlobalStyle from 'styles/global-styles'
import '../styles/globals.css'

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
