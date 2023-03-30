import React from 'react'
import PropTypes from 'prop-types'
import { API_ENDPOINTS } from '@shared/constants'

const ISRDemoPage = (props) => {
  return (
    <div>
      {props.data.map((user) => (
        <p key={user._id}>{`${user.name} - ${user.address}`}</p>
      ))}
    </div>
  )
}

ISRDemoPage.propTypes = {
  data: PropTypes.object
}

export default ISRDemoPage

export const getStaticProps = async () => {
  const data = await await (await fetch(`${API_ENDPOINTS.STUDENT_ISR_API}`)).json()
  return {
    props: {
      data
    },
    revalidate: 10
  }
}
