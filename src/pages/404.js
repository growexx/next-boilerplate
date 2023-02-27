import React from 'react'
import { Result } from 'antd'
import Link from 'next/link'

import { ROUTES } from '@shared/constants'

export default function NotFound() {
  return (
    <article>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link href={ROUTES.HOME}>Back Home</Link>}
      />
    </article>
  )
}
