import React from 'react'
import { Skeleton } from 'antd'
import Link from 'next/link'

import { ROUTES } from '@shared/constants'
import { usePosts } from '@shared/hooks/use-posts'

const PostList = () => {
  const { data, isLoading } = usePosts(10)

  return (
    <>
      <Skeleton loading={isLoading} paragraph={{ rows: 20 }} />
      {data?.map((post) => {
        return (
          <div key={post.id}>
            <h3>
              <Link href={`${ROUTES.SSR_DEMO}/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.body}</p>
          </div>
        )
      })}
    </>
  )
}

export default PostList
