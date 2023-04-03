import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { addNewUserFailure, addNewUserSuccess, failedResponse, responseWithList, responseWithZeroList, USER_DATA } from '../stub'
import { TEST_IDS } from '../constants'
import UserManagement from '../index'
import request from '@shared/utils/request'

jest.mock('@shared/utils/request')

const fieldUpdateViaPlaceHolder = [
  {
    key: 'john.doe@growexx.com',
    value: USER_DATA.EMAIL
  },
  {
    key: 'John',
    value: USER_DATA.NAME
  },
  {
    key: 'Doe',
    value: USER_DATA.NAME
  }
]

describe('Check component:<Users /> is rendering properly', () => {
  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()))
  })

  afterEach(() => {
    request.mockClear()
  })

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<UserManagement />)
    expect(firstChild).toMatchSnapshot()
  })

  it.only('Click: New User Modal should show modal', async () => {
    render(<UserManagement />)
    await waitFor(() => screen.findByTestId(TEST_IDS.ADD_USER))
    fireEvent.click(screen.getByTestId(TEST_IDS.ADD_USER))
    expect(screen.getByText('Add User')).toBeTruthy()
    fireEvent.click(screen.getByTestId(TEST_IDS.ADD_USER))
    fireEvent.click(screen.getByTestId(TEST_IDS.USER_MODAL_CANCEL))
  })

  it('Click Delete: Show Confirmation Modal', async () => {
    render(<UserManagement />)
    await waitFor(() => screen.findByText('Active'))
    fireEvent.click(screen.getByTestId(TEST_IDS.DELETE_BUTTON))
    expect(screen.getByText('OK', { trim: true })).toBeTruthy()
  })

  it('Click Delete: Show Confirmation Modal and click confirm', async () => {
    render(<UserManagement />)
    await waitFor(() => screen.findByText('Active'))
    fireEvent.click(screen.getByTestId(TEST_IDS.DELETE_BUTTON))
    expect(screen.getByText('OK', { trim: true })).toBeTruthy()
    fireEvent.click(screen.getByTestId(TEST_IDS.DELETE_BUTTON_CONFIRMED))
  })
})

describe('Check listing of users is rendering properly', () => {
  beforeEach(() => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()))
  })

  afterEach(() => {
    request.mockClear()
  })

  it('No Records found for users', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithZeroList()))
    render(<UserManagement />)
    await waitFor(() => screen.findByText('No data'))
    expect(screen.getByText('No data')).toBeTruthy()
  })

  it('Users Listing with few records should be shown', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()))
    render(<UserManagement />)
    await waitFor(() => screen.findByText('Active'))
    expect(screen.getByText('Active')).toBeTruthy()
  })

  it('Users Listing with pagination', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()))
    render(<UserManagement />)
    await waitFor(() => screen.findByText('Active'))
    // Expand Data
    fireEvent.click(document.querySelectorAll('.ant-table-row-expand-icon')[0])

    expect(screen.getByText('Active')).toBeTruthy()
    fireEvent.click(screen.getByTitle('2'))
  })

  it('Failed Users Listing api', async () => {
    request.mockImplementationOnce(() => Promise.reject(failedResponse))
    render(<UserManagement />)
    await waitFor(() => screen.findByText('No Data'))
    expect(screen.getByText('No Data')).toBeTruthy()
  })

  it('Toggle User Status', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()))
    render(<UserManagement />)
    await waitFor(() => screen.findByText('Active'))
    fireEvent.click(screen.getByTestId(TEST_IDS.STATUS_TOGGLE))
  })

  it('Click Delete: Show Confirmation Modal and click confirm', async () => {
    request.mockImplementation(() => Promise.resolve(failedResponse()))
    render(<UserManagement />)
    await waitFor(() => screen.findByText('Active'))
    fireEvent.click(screen.getByTestId(TEST_IDS.DELETE_BUTTON))
    expect(screen.getByText('OK', { trim: true })).toBeTruthy()
    fireEvent.click(screen.getByTestId(TEST_IDS.DELETE_BUTTON_CONFIRMED))
  })

  it('Click Delete: Show Confirmation Modal and click confirm', async () => {
    request.mockImplementation(() => Promise.resolve(failedResponse()))
    render(<UserManagement />)
    await waitFor(() => screen.findByText('Active'))
    fireEvent.click(screen.getByTestId(TEST_IDS.DELETE_BUTTON))
    expect(screen.getByText('OK', { trim: true })).toBeTruthy()
    fireEvent.click(screen.getByTestId(TEST_IDS.DELETE_CONFIRMATION_CANCEL))
  })

  it('Toggle User Status Local', async () => {
    request.mockImplementation(() => Promise.resolve(responseWithList()))
    render(<UserManagement />)
    await waitFor(() => screen.findByText('Active'))
    fireEvent.click(screen.getByTestId(TEST_IDS.STATUS_TOGGLE))
  })
})

describe('New Users', () => {
  it('Add new users with success', () => {
    request.mockImplementation(() => Promise.resolve(addNewUserSuccess()))
    render(<UserManagement />)
    fireEvent.click(screen.getByTestId(TEST_IDS.ADD_USER))
    fieldUpdateViaPlaceHolder.forEach((d) => {
      fireEvent.change(screen.getByPlaceholderText(d.key), {
        target: { value: d.value }
      })
    })
    expect(screen.getByText('Add User')).toBeTruthy()
    fireEvent.click(screen.getByText('Add'))
  })

  it('Add new user with cancel option', () => {
    request.mockImplementation(() => Promise.resolve(addNewUserSuccess()))
    render(<UserManagement />)
    fireEvent.click(screen.getByTestId(TEST_IDS.ADD_USER))
    fireEvent.click(screen.getByTestId(TEST_IDS.USER_MODAL_CANCEL))
  })

  it('Add new user with failure', () => {
    request.mockImplementation(() => Promise.reject(addNewUserFailure()))
    render(<UserManagement />)
    fireEvent.click(screen.getByTestId(TEST_IDS.ADD_USER))
    fieldUpdateViaPlaceHolder.forEach((d) => {
      fireEvent.change(screen.getByPlaceholderText(d.key), {
        target: { value: d.value }
      })
    })
    expect(screen.getByText('Add User')).toBeTruthy()
    fireEvent.click(screen.getByTestId(TEST_IDS.USER_MODAL_OK))
  })
})

describe('Update User', () => {
  it('Update user with success', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()))
    render(<UserManagement />)
    expect(request).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.findByText('Active'))
    fireEvent.click(screen.getByTestId(TEST_IDS.EDIT_BUTTON))
    fieldUpdateViaPlaceHolder.forEach((d) => {
      fireEvent.change(screen.getByPlaceholderText(d.key), {
        target: { value: d.value }
      })
    })
    expect(screen.getByText('Update')).toBeTruthy()
    fireEvent.click(screen.getByTestId(TEST_IDS.ADD_USER))
  })

  it('Update user with cancel', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()))
    render(<UserManagement />)
    expect(request).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.findByText('Active'))
    fireEvent.click(screen.getByTestId(TEST_IDS.EDIT_BUTTON))
    expect(screen.getByText('Update')).toBeTruthy()
    fireEvent.click(screen.getByTestId(TEST_IDS.USER_MODAL_CANCEL))
  })

  it('User Update failure', async () => {
    request
      .mockImplementationOnce(() => Promise.resolve(responseWithList()))
      .mockImplementationOnce(() => Promise.resolve(addNewUserFailure()))
    render(<UserManagement />)
    expect(request).toHaveBeenCalledTimes(1)
    await waitFor(() => screen.getByText('Active') || screen.getByText('Suspended'))
    fireEvent.click(screen.getByTestId(TEST_IDS.EDIT_BUTTON))
    fieldUpdateViaPlaceHolder.forEach((d) => {
      fireEvent.change(screen.getByPlaceholderText(d.key), {
        target: { value: d.value }
      })
    })
    expect(screen.getByText('Update')).toBeTruthy()
    fireEvent.click(screen.getByText('Update'))
  })
})

describe('Status Filter', () => {
  it('Status Filter', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()))
    render(<UserManagement />)
    await waitFor(() => screen.findByRole('combobox'))
    fireEvent.mouseDown(screen.getByRole('combobox'))
    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        value: 'Active'
      }
    })
    fireEvent.click(document.querySelectorAll('.ant-select-item-option-content')[0])
    fireEvent.blur(screen.getByRole('combobox'))
    fireEvent.focus(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('Name'))
  })
})

describe('Search & Sorting user list', () => {
  it('Sorting user with success', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()))
    render(<UserManagement />)
    fireEvent.click(screen.getByText('Name'))
  })
  it('Search user with success', async () => {
    request.mockImplementationOnce(() => Promise.resolve(responseWithList()))
    render(<UserManagement />)
    document.querySelectorAll('.ant-input-affix-wrapper')[0].children[0].value = 'Hello'
    fireEvent.click(document.querySelectorAll('.ant-input-search-button')[0])
  })

  it('Search user with success', async () => {
    render(<UserManagement />)
    fireEvent.change(screen.getByPlaceholderText('Search User'), {
      target: { value: 'a' }
    })
    fireEvent.change(screen.getByPlaceholderText('Search User'), {
      target: { value: '' }
    })
  })

  it('Sorting', async () => {
    render(<UserManagement />)
    fireEvent.click(screen.getByText('Name'))
    fireEvent.click(screen.getByText('Name'))
    fireEvent.click(screen.getByText('Name'))
    fireEvent.click(screen.getByText('User Id'))
    fireEvent.click(screen.getByText('User Id'))
    fireEvent.click(screen.getByText('User Id'))
  })
})
