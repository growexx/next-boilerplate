import React from 'react'
import { Skeleton } from 'antd'
import { useRouter } from 'next/router'

import { usePost } from '@shared/hooks/use-post'

const PostDetails = () => {
  const {
    query: { id }
  } = useRouter()
  const { data, isLoading } = usePost(id)

  return (
    <>
      <Skeleton loading={isLoading} />
      <h3>{data?.title}</h3>
      <p>{data?.body}</p>
    </>
  )
}

export default PostDetails
