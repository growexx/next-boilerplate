import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Open_Sans } from '@next/font/google'
import dynamic from 'next/dynamic'
import { Spin } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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

const queryClientWithDefaultOptions = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => queryClientWithDefaultOptions)

  return (
    <main className={openSans.className}>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <GlobalStyle />
    </main>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}
