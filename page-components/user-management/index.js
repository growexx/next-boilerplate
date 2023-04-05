import React, { useState, useEffect, useCallback } from 'react'
import { Button, Tooltip, Modal, Form, notification, Switch, Space, Popconfirm, Row, Col } from 'antd'
import { useForm } from 'react-hook-form'
import { get } from 'lodash'
import moment from 'moment'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Image from 'next/image'

import { FULL_GENERIC_MOMENT_DATE_FORMAT, GET_DEFAULT_PAGINATION, GET_SORT_ORDER, SORTING } from '@shared/constants'
import { deleteUserAPIMock, getUsersAPIMock, updateUserAPIMock } from './stub'
import {
  AccountStatusDropDown,
  DataTableWrapper,
  FilterItems,
  FiltersWrapper,
  MainContentWrapper,
  PageHeaderWrapper,
  SearchWrapper
} from './styled'
import { debounce } from '@shared/utils/debounce'
import { ACCOUNT_STATUS, MESSAGES, POPUP_ACTION, TEST_IDS } from './constants'
import { Input } from '@shared/utils/Fields'

const logsTableProps = {
  showHeader: true
}

const UserManagement = () => {
  const { handleSubmit, formState, control, reset } = useForm()

  const [isListLoading, setIsListLoading] = useState(false)
  const [pagination, setPagination] = useState(GET_DEFAULT_PAGINATION())
  const [userList, setUserList] = useState([])
  const sortType = SORTING.ASC
  const sortKey = 'id'
  const [search, setSearch] = useState('')
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const [popUpAction, setPopUpAction] = useState('')
  const [isPopUpLoading, setIsPopUpLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [status, setStatus] = useState('')
  const [showUserModal, setShowUserModal] = useState(false)

  useEffect(() => {
    loadUserDetails({ pagination })
  }, [])

  const options = Object.keys(ACCOUNT_STATUS).map((key) => ({
    value: ACCOUNT_STATUS[key],
    label: ACCOUNT_STATUS[key]
  }))

  const onStatusSelectChange = (status) => {
    loadUserDetails({ status })
  }

  const onSearchUser = (e) => {
    const { value } = e.target
    setSearch(value)
    setPagination(GET_DEFAULT_PAGINATION())
    debouncedLoadUserDetails({ search: value })
  }

  const debouncedLoadUserDetails = debounce((d) => loadUserDetails(d), 300)

  const loadUserDetails = ({
    pagination: newPagination = pagination,
    sortType: newSortType = sortType,
    sortKey: newSortKey = sortKey,
    search: newSearch = search,
    status: newStatus = status
  }) => {
    const sortTypeParam = newSortType || sortType || 'asc'
    const sortKeyParam = newSortKey || sortKey || 'id'
    const searchParam = getLatestValue(newSearch, search) || ''
    const statusParam = getLatestValue(newStatus, status) || ''
    const paginationParam = getUpdatedPagination({ pagination: newPagination, status: statusParam }) || ''

    const requestedAPI = getUsersAPIMock({
      limit: paginationParam.pageSize,
      skip: paginationParam.current,
      sortKey: sortKeyParam,
      sortType: sortTypeParam,
      search: searchParam,
      status: statusParam
    })

    requestedAPI
      .then((response) => {
        return setUserDetails(response, {
          pagination,
          search,
          status
        })
      })
      .catch((error) => {
        notification.error({ message: error?.message })
      })
  }

  const getColumnProps = () => {
    return [
      {
        title: 'User Id',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend']
      },
      {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        width: '20%',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        render: (_action, data) => `${data.firstName} ${data.lastName}`
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '20%',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend']
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '15%',
        sorter: true,
        sortDirections: ['descend', 'ascend', 'descend'],
        render: (_action, data) => (
          <Switch
            data-testid={TEST_IDS.STATUS_TOGGLE}
            checkedChildren="Active"
            unCheckedChildren="Suspend"
            defaultChecked={data.status === ACCOUNT_STATUS.ACTIVE}
            loading={isPopUpLoading && userId === data.id}
            disabled={isPopUpLoading}
            onChange={(active) => {
              handlePopupOk(
                {
                  status: active ? ACCOUNT_STATUS.ACTIVE : ACCOUNT_STATUS.SUSPENDED
                },
                data.id
              )
              setIsPopUpLoading(true)
            }}
          />
        )
      },
      {
        title: 'Last Access Date',
        dataIndex: 'lastAccessDate',
        key: 'lastAccessDate',
        width: '15%',
        render: (v) => <Space size="middle">{moment(v).format(FULL_GENERIC_MOMENT_DATE_FORMAT)}</Space>
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (action, data) => (
          <Space size="middle">
            <Button
              data-testid={TEST_IDS.EDIT_BUTTON}
              type="secondary"
              htmlType="submit"
              onClick={() => editUser(data.id)}
              title={userId ? 'Edit User' : 'Add User'}
            >
              <FaEdit />
            </Button>
            <Popconfirm
              title={MESSAGES.DELETE}
              open={isPopUpVisible && popUpAction === POPUP_ACTION.DELETE && userId === data.id}
              onConfirm={() => handlePopupOk({ isDeleted: true }, data.id)}
              okButtonProps={{
                loading: isPopUpLoading,
                'data-testid': TEST_IDS.DELETE_BUTTON_CONFIRMED
              }}
              cancelButtonProps={{
                'data-testid': TEST_IDS.DELETE_CONFIRMATION_CANCEL
              }}
              onCancel={handlePopupCancel}
            >
              <Button
                data-testid={TEST_IDS.DELETE_BUTTON}
                type="secondary"
                htmlType="submit"
                onClick={() => showPopConfirm(POPUP_ACTION.DELETE, data.id)}
                title={MESSAGES.TITLE.DELETE}
              >
                <FaTrash />
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    ]
  }

  const handlePopupCancel = () => {
    setUserId('')
    setPopUpAction('')
    setIsPopUpVisible(false)
  }

  const showPopConfirm = (action, userId) => {
    setIsPopUpVisible(true)
    setUserId(userId)
    setPopUpAction(action)
  }

  const showError = (error) => {
    error?.response?.json().then((err) => notification.error({ message: err.message }))
  }

  const handlePopupOk = (payload, userId) => {
    const resetAction = () => {
      setIsPopUpLoading(false)
      setIsPopUpVisible(false)
      setUserId('')
      setPopUpAction('')
    }
    const currentUser = userList.find((u) => u.id === userId)
    setIsPopUpLoading(true)
    const isDelete = popUpAction === POPUP_ACTION.DELETE
    if (isDelete) {
      const requestedAPI = deleteUserAPIMock(userId)
      requestedAPI
        .then((response) => {
          resetAction()
          notification.success({
            message: response?.message
          })
          loadUserDetails({})
        })
        .catch((error) => {
          showError(error)
          resetAction()
        })
    } else {
      const requestedAPI = updateUserAPIMock({ ...currentUser, ...payload })

      requestedAPI
        .then(() => {
          resetAction()
          notification.success({ message: 'Updated User' })
          loadUserDetails({})
        })
        .catch((error) => {
          showError(error)
          resetAction()
        })
    }
  }

  const getLatestValue = (newValue, oldValue) => {
    return newValue === '' ? newValue : newValue || oldValue
  }

  const getUpdatedPagination = ({ status: newStatus, pagination }) => {
    if (status !== newStatus) {
      return GET_DEFAULT_PAGINATION()
    }

    return pagination
  }

  const setUserDetails = (response, { pagination, status }) => {
    if (get(response, 'status')) {
      setUserList(get(response, 'data', []))
      setPagination(get(response, 'pagination', pagination))
      setIsListLoading(false)
      setStatus(status)
    } else {
      notification.error({ message: get(response, 'message') })
    }
  }

  const onTableOptionChange = (pagination, _filters, sorter) => {
    loadUserDetails({
      pagination,
      sortType: GET_SORT_ORDER(sorter?.order),
      sortKey: sorter?.columnKey
    })
  }

  const expandableRowRender = (record) => (
    <Row gutter={5} className="p-2">
      <Col span={6}>
        <Image src={record.profileUrl} width={100} height={100} />
      </Col>
      <Col span={6} />
    </Row>
  )

  const editUser = (userId) => {
    const user = userList.find((item) => item.id === userId)
    if (user) {
      reset({ ...user })
      setUserId(userId)
      setShowUserModal(true)
      setIsPopUpVisible(false)
    }
  }

  const toggleModals = () => {
    reset({})
    setShowUserModal(!showUserModal)
    setUserId('')
  }

  const updateUser = (data) => {
    setIsListLoading(true)
    const isUpdate = !!userId
    const requestedAPI = updateUserAPIMock(
      {
        ...data,
        id: data.id
      },
      !isUpdate
    )

    requestedAPI
      .then((response) => {
        setIsListLoading(false)
        setShowUserModal(false)
        setUserId('')
        loadUserDetails({})
        notification.success({
          message: response && response.message
        })
      })
      .catch((error) => {
        showError(error)
        setIsListLoading(false)
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

  const userModal = () => {
    return (
      <Modal
        title={userId ? 'Edit User' : 'Add User'}
        open={showUserModal}
        onOk={handleSubmit(updateUser)}
        confirmLoading={isListLoading}
        onCancel={() => toggleModals()}
        okButtonProps={{
          disabled: false,
          'data-testid': TEST_IDS.USER_MODAL_OK
        }}
        okText={userId ? 'Update' : 'Add'}
        cancelButtonProps={{
          disabled: false,
          'data-testid': TEST_IDS.USER_MODAL_CANCEL
        }}
      >
        <form onSubmit={handleSubmit(updateUser)} className="mb-3">
          <Form.Item {...formItemLayout} label="Email *" {...formItemWithErrorProps('email')}>
            <Input
              control={control}
              name="email"
              label="Email *"
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

          <Form.Item {...formItemLayout} label="First Name  *" {...formItemWithErrorProps('firstName')}>
            <Input
              control={control}
              name="firstName"
              label="First Name  *"
              placeholder="John"
              rules={{
                required: {
                  value: true,
                  message: 'First Name is required'
                }
              }}
            />
          </Form.Item>

          <Form.Item {...formItemLayout} label="Last Name  *" {...formItemWithErrorProps('lastName')}>
            <Input
              control={control}
              name="lastName"
              label="Last Name  *"
              placeholder="John"
              rules={{
                required: {
                  value: true,
                  message: 'Last Name is required'
                }
              }}
            />
          </Form.Item>
        </form>
      </Modal>
    )
  }

  return (
    <>
      <PageHeaderWrapper
        title="Users"
        extra={[
          <FiltersWrapper key={status}>
            <FilterItems>
              <AccountStatusDropDown
                placeholder="User Status"
                allowClear
                key={status}
                onChange={onStatusSelectChange}
                options={options}
                disabled={isListLoading}
              />
            </FilterItems>
            <FilterItems>
              <Tooltip title="Search by Name, Email">
                <SearchWrapper
                  allowClear
                  placeholder="Search User"
                  data-testid={TEST_IDS.SEARCH_USER}
                  isListLoading
                  value={search}
                  onChange={onSearchUser}
                  onSearch={(value) => loadUserDetails({ search: value })}
                />
              </Tooltip>
            </FilterItems>
            <FilterItems>
              <Button data-testid={TEST_IDS.ADD_USER} color="primary" onClick={() => toggleModals()}>
                Add User
              </Button>
            </FilterItems>
          </FiltersWrapper>
        ]}
      />
      <MainContentWrapper>
        <DataTableWrapper
          {...logsTableProps}
          expandedRowRender={expandableRowRender}
          rowKey={(record) => record.id}
          pagination={pagination}
          loading={isListLoading}
          columns={getColumnProps()}
          dataSource={userList}
          onChange={onTableOptionChange}
        />
        {userModal()}
      </MainContentWrapper>
    </>
  )
}

export default UserManagement
