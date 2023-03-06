import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Open_Sans } from '@next/font/google'
import dynamic from 'next/dynamic'
import { ConfigProvider, Spin } from 'antd'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4d186e',
            colorPrimaryHover: '#3E1358',
            blue: '#4d186e',
            colorError: '#ff0000',
            lineHeight: '1.5715'
          }
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </ConfigProvider>
      <GlobalStyle />
    </main>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}
