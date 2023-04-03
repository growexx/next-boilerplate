import React, { useCallback } from 'react'
import { Form, Skeleton } from 'antd'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'

import { Input } from '@shared/utils/Fields'
import { Section } from './styled'
import List from '@shared/components/list'
import RepoListItem from '@shared/components/repo-list-item'
import useDebounce from '@shared/hooks/use-debounce'
import { TEST_IDS } from './stub'

const RepoList = () => {
  const { handleSubmit, formState, control, watch } = useForm()
  const userName = watch('username')
  const debouncedSearchValue = useDebounce(userName, 300)

  const { isFetching, data, isError, refetch } = useQuery(
    ['userNameSearchQuery', debouncedSearchValue],
    () => searchUserName(debouncedSearchValue),
    {
      enabled: !!userName
    }
  )

  const onSubmit = (data) => {
    data.userName && refetch()
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

  const RepoLoader = () => (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <Skeleton.Input active block size="small" />
          <br />
          <br />
        </div>
      ))}
    </>
  )

  const searchUserName = async (userName) => {
    return fetch(`https://api.github.com/users/${userName}/repos`)
      .then((res) => res.json())
      .then((data) => {
        return data
      })
  }

  return (
    <div>
      <Section>
        <h2>Try me!</h2>

        <Form onFinish={handleSubmit(onSubmit)} data-testid={TEST_IDS.REPO_FORM} autoComplete="off">
          <Form.Item {...formItemLayout} label="Show Github repositories by @" {...formItemWithErrorProps('username')}>
            <Input control={control} name="username" placeholder="John" />
          </Form.Item>
        </Form>

        {isFetching && <RepoLoader />}
        {data?.length > 0 && !isError && !isFetching && <List items={data} component={RepoListItem} />}
        {data && data.message && !isFetching && <p>No data found</p>}
      </Section>
    </div>
  )
}

export default RepoList
