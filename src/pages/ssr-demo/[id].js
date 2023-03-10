import React from 'react'
import Head from 'next/head'
import { Skeleton } from 'antd'
import dynamic from 'next/dynamic'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import { fetchPost } from '@shared/hooks/use-post'

const PostDetails = dynamic(() => import('@page-components/post-details'), {
  loading: () => <Skeleton paragraph={{ rows: 20 }} />
})

const PostDetailsPage = (props) => {
  return (
    <>
      <Head>
        <title>SSR Demo</title>
      </Head>
      <section>
        <PostDetails />
      </section>
    </>
  )
}

export default PostDetailsPage

export const getServerSideProps = async ({ params }) => {
  const { id } = params
  const queryClient = new QueryClient()
  queryClient.fetchQuery(['getPost', id], () => fetchPost(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
