import React from 'react'
import PropTypes from 'prop-types'
import { Roboto } from '@next/font/google'

import '../styles/globals.css'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}
