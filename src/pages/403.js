import React from 'react'
import { Result } from 'antd'
import Link from 'next/link'

import { ROUTES } from '@shared/constants'

const NotFound = () => {
  return (
    <article>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Link href={ROUTES.HOME}>Back Home</Link>}
      />
    </article>
  )
}

export default NotFound
