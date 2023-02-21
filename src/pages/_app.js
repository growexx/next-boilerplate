import React from 'react'
import PropTypes from 'prop-types'
import { Open_Sans } from '@next/font/google'

import '../styles/globals.css'

const openSans = Open_Sans({
  weight: '400',
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <main className={openSans.className}>
      <Component {...pageProps} />
    </main>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}
