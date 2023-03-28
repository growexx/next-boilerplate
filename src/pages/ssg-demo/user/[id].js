import React from 'react'
import PropTypes from 'prop-types'

const UserInfo = (props) => {
  return (
    <div>
      <h1>Profile of {props.data.firstName}</h1>
    </div>
  )
}

export const getStaticPaths = async () => {
  const data = await (await fetch('https://dummyjson.com/users')).json()
  const allUserIds = data.users.map((user) => user.id)

  return {
    paths: allUserIds.map((userId) => ({ params: { id: `${userId}` } })),
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const data = await (await fetch(`https://dummyjson.com/users/${id}`)).json()
  return {
    props: {
      data
    }
  }
}

UserInfo.propTypes = {
  data: PropTypes.any
}

export default UserInfo
