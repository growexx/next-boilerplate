import React from 'react'

import dynamic from 'next/dynamic'
import { Skeleton } from 'antd'
import Head from 'next/head'

const RepoList = dynamic(() => import('@page-components/repo-list'), {
  loading: () => <Skeleton active block paragraph={{ row: 2 }} />
})

const GithubSearchPage = () => {
  return (
    <>
      <Head>
        <title>Github Search</title>
      </Head>
      <RepoList />
    </>
  )
}

export default GithubSearchPage
