import React from 'react'

import dynamic from 'next/dynamic'
import { Skeleton } from 'antd'

const RepoList = dynamic(() => import('@page-components/repo-list'), {
  loading: () => <Skeleton active block paragraph={{ row: 2 }} />
})

const GithubSearchPage = () => {
  return (
    <>
      <RepoList />
    </>
  )
}

export default GithubSearchPage
