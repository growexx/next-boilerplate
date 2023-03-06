import React from 'react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import Head from 'next/head'
import { Skeleton } from 'antd'
import dynamic from 'next/dynamic'

import { fetchPosts } from '@shared/hooks/use-posts'

const PostList = dynamic(() => import('@page-components/post-list'), {
  loading: () => <Skeleton paragraph={{ rows: 20 }} />
})

const SsrDemoPage = (props) => {
  return (
    <>
      <Head>
        <title>SSR Demo</title>
      </Head>
      <PostList />
    </>
  )
}

export default SsrDemoPage

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.fetchQuery(['getPosts'], fetchPosts)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
