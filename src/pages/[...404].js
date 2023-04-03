import React from 'react'
import { Result } from 'antd'
import Link from 'next/link'

import { ROUTES } from '@shared/constants'

const NotFound = () => {
  return (
    <article>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist or you are not authorized to access this page."
        extra={<Link href={ROUTES.HOME}>Back Home</Link>}
      />
    </article>
  )
}

export default NotFound

NotFound.getLayout = (page) => {
  return page
}
