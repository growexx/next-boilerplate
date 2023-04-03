import React from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from 'antd'
import Head from 'next/head'
import { getServerSession } from 'next-auth'
import PropTypes from 'prop-types'

import { authOptions } from '../api/auth/[...nextauth]'

const SignIn = dynamic(() => import('@page-components/sign-in'), {
  loading: () => (
    <Skeleton
      active
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '300px',
        margin: '0 auto'
      }}
    />
  ),
  ssr: false
})

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <section>
        <SignIn />
      </section>
    </>
  )
}

SignInPage.getLayout = (page) => {
  return page
}

SignInPage.propTypes = {
  session: PropTypes.object
}

export default SignInPage

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }
  return {
    props: {
      session: JSON.parse(JSON.stringify(session))
    }
  }
}
