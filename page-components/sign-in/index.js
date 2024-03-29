import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { GoMarkGithub } from 'react-icons/go'
import { BsGoogle } from 'react-icons/bs'
import { Button, Form, List } from 'antd'

import { Input, InputPassword } from '@shared/utils/Fields'
import { StyledSignIn } from './StyledSignIn'
import { TEST_IDS } from './stub'

const SignIn = () => {
  const { control, handleSubmit, formState } = useForm()

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
    <StyledSignIn>
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Form.Item {...formItemLayout} label="Password *" {...formItemWithErrorProps('password')}>
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
      </Form>

      <List>
        <List.Item
          data-testid={TEST_IDS.GITHUB_SIGN_IN_BUTTON}
          onClick={() =>
            signIn('github', {
              callbackUrl: '/'
            })
          }
        >
          <GoMarkGithub />
        </List.Item>
        <List.Item
          data-testid={TEST_IDS.GOOGLE_SIGN_IN_BUTTON}
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
}

export default SignIn
