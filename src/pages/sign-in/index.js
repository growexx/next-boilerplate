import React from 'react'
import dynamic from 'next/dynamic'

// import Layout from '../../shared/components/layout'
// import { formLoader } from '@shared/libs/allLoader'
// import WithAuth from '@shared/components/withAuth'
// import { allRoutes } from '@shared/constants/allRoutes'

const SignIn = dynamic(() => import('@shared/components/auth/signIn'), {
  loading: () => 'loading...',
  ssr: false
})

function SignInPage() {
  return (
    <section>
      <SignIn />
    </section>
  )
}

export default SignInPage
