import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { GoMarkGithub } from 'react-icons/go'
import { BsGoogle } from 'react-icons/bs'
import { Button, Form, List } from 'antd'

import { Input, InputPassword } from '@shared/utils/Fields'
import { StyledSignIn } from './StyledSignIn'

const SignIn = () => {
  const { control, handleSubmit, formState } = useForm()
  const router = useRouter()
  const { data: session, loading } = useSession()

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
    !session &&
    !loading && (
      <StyledSignIn>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <InputPassword
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

          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </form>

        <List>
          <List.Item
            onClick={() =>
              signIn('github', {
                callbackUrl: '/'
              })
            }
          >
            <GoMarkGithub />
          </List.Item>
          <List.Item
            onClick={() =>
              signIn('google', {
                callbackUrl: '/'
              })
            }
          >
            <BsGoogle />
          </List.Item>
        </List>
      </StyledSignIn>
    )
  )
}

export default SignIn
