import React from 'react'
import PropTypes from 'prop-types'

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
  const data = await (await fetch('https://dummyjson.com/users')).json()
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
