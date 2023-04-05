import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Open_Sans } from '@next/font/google'
import dynamic from 'next/dynamic'
import { ConfigProvider, Spin } from 'antd'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'

import GlobalStyle from 'styles/global-styles'
import useApp from '@shared/hooks/use-app'

const MainLayout = dynamic(() => import('@shared/components/layouts/main-layout'), {
  loading: () => (
    <Spin
      spinning
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
        color: '#4d186e'
      }}
    />
  ),
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
  useApp()
  const [queryClient] = useState(() => queryClientWithDefaultOptions)

  const GetPageWithLayout = () => {
    if (Component.getLayout) {
      return Component.getLayout(<Component {...pageProps} />)
    } else {
      return (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )
    }
  }

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
            <SessionProvider session={pageProps.session}>
              <GetPageWithLayout />
            </SessionProvider>
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
