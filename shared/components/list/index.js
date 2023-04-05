import React from 'react'
import PropTypes from 'prop-types'

import Ul from './Ul'
import Wrapper from './Wrapper'

const List = ({ component, items }) => {
  const ComponentToRender = component
  let content = <div />

  if (items) {
    content = items?.map((item) => <ComponentToRender key={`item-${item.id}`} item={item} />)
  } else {
    content = <ComponentToRender />
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  )
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array
}

export default List
