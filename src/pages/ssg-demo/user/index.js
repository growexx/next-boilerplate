import React from 'react'
import PropTypes from 'prop-types'
import { API_ENDPOINTS } from '@shared/constants'

const UserPage = (props) => {
  return (
    <div>
      <h1>User page(SSG)</h1>
      {props.data.users.map((user) => (
        <p key={user.id}>{user.firstName}</p>
      ))}
    </div>
  )
}

export const getStaticProps = async () => {
  const data = await (await fetch(`${API_ENDPOINTS.DUMMY_USER}`)).json()
  return {
    props: {
      data
    }
  }
}

UserPage.propTypes = {
  data: PropTypes.any
}

export default UserPage
