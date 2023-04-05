import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@shared/constants'

let USERS = [
  {
    firstName: 'Serena',
    lastName: 'Juckes',
    email: 'sjuckes0@forbes.com'
  },
  {
    firstName: 'Trevor',
    lastName: 'Shernock',
    email: 'tshernock1@google.nl'
  }
].map((user, i) => {
  const updatedUser = user
  updatedUser.profileUrl = 'https://thispersondoesnotexist.com/image'
  updatedUser.lastAccessDate = new Date()
  updatedUser.verified = true
  updatedUser.status = i % 2 === 0 ? 'Active' : 'Suspended'
  updatedUser.id = i + 1

  return updatedUser
})

const getSortedUsers = (sortType, sortKey, allUsers) => {
  const updatedSortKey = sortKey
  try {
    return allUsers.sort((user1, user2) => {
      if (updatedSortKey === 'id') {
        return sortType === 1 ? user1[updatedSortKey] - user2[updatedSortKey] : user2[updatedSortKey] - user1[updatedSortKey]
      }

      return sortType === 1
        ? user1[updatedSortKey].localeCompare(user2[updatedSortKey])
        : user2[updatedSortKey].localeCompare(user1[updatedSortKey])
    })
  } catch (error) {
    return allUsers
  }
}

export const getUsersAPIMock = ({ limit = DEFAULT_LIMIT, skip = DEFAULT_PAGE, sortType, sortKey, search, status } = {}) => {
  const users = []
  const skipIndexs = (skip - 1) * limit
  let allUsers = USERS
  allUsers = getSortedUsers(sortType, sortKey, allUsers)

  const contains = (parentObject, key, term) => parentObject[key].toLocaleLowerCase().includes(term.toLocaleLowerCase())

  if (search) {
    allUsers = allUsers.filter(
      (user) => contains(user, 'firstName', search) || contains(user, 'lastName', search) || contains(user, 'email', search)
    )
  }

  if (status) {
    allUsers = allUsers.filter((user) => user.status === status)
  }
  // eslint-disable-next-line no-plusplus
  for (let index = skipIndexs; index < allUsers.length; index++) {
    if (users.length === limit) {
      break
    }

    users.push(allUsers[index])
  }

  return Promise.resolve({
    data: users,
    pagination: {
      pageSize: limit,
      current: skip,
      total: allUsers.length
    },
    status: 1
  })
}

export const deleteUserAPIMock = (id) => {
  USERS = USERS.filter((user) => user.id !== id)

  return Promise.resolve({
    status: 1,
    message: 'Deleted'
  })
}

export const updateUserAPIMock = (payload, newRecord) => {
  if (newRecord) {
    USERS.push({
      ...payload,
      id: USERS.length + 1
    })
  } else {
    USERS = USERS.map((user) => {
      let updatedUser = user
      if (updatedUser.id === payload.id) {
        updatedUser = { ...user, ...payload }
      }

      return updatedUser
    })
  }
  return Promise.resolve({
    status: 1,
    message: 'Success'
  })
}

export const USER_DATA = {
  EMAIL: 'it@growexx.com',
  URL: 'https://growexx.atlassian.net',
  NAME: 'GrowExx',
  _ID: '60631fbe96e98c33713f7000'
}

export const responseWithZeroList = () => ({
  data: [],
  pagination: {
    pageSize: DEFAULT_LIMIT,
    current: DEFAULT_PAGE,
    total: 0
  },
  status: 1
})

export const responseWithList = ({ status } = {}) => ({
  data: USERS.splice(0, DEFAULT_LIMIT),
  pagination: {
    pageSize: DEFAULT_LIMIT,
    current: DEFAULT_PAGE,
    total: USERS.length
  },
  status: status || 1
})

export const failedResponse = {
  data: null,
  status: 0,
  message: 'You do not have access'
}

// Add | Edit
export const addNewUserFailure = () => ({
  response: {}
})

export const addNewUserSuccess = () => ({
  message: 'Done',
  status: 1
})
