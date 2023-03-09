import { Form } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Input } from '@shared/utils/Fields'

const SignIn = () => {
  const { control, handleSubmit, formState } = useForm()
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.replace('/')
  }, [session])

  const onSubmit = async (data) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/'
    })
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  }

  const formItemWithErrorProps = useCallback(
    (name) => {
      const error = formState.errors[name]
      if (!error) return { name }
      return {
        name,
        validateStatus: 'error',
        help: error.message
      }
    },
    [formState.errors]
  )

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
        <Form.Item {...formItemLayout} label="Email *" {...formItemWithErrorProps('email')}>
          <Input
            control={control}
            name="email"
            placeholder="john@example.com"
            rules={{
              required: {
                value: true,
                message: 'Email is required'
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address'
              }
            }}
          />
        </Form.Item>

        <Form.Item {...formItemLayout} label="Password  *" {...formItemWithErrorProps('password')}>
          <Input
            control={control}
            name="password"
            type="password"
            rules={{
              required: {
                value: true,
                message: 'Password is required'
              }
            }}
          />
        </Form.Item>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignIn
