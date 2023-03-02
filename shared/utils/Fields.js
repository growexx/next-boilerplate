import React from 'react'
import PropTypes from 'prop-types'
import { Input as AntdInput, Select as AntdSelect } from 'antd'
import { useController } from 'react-hook-form'

export const Input = ({ control, name, rules = {}, ...rest }) => {
  const {
    field: { onChange, onBlur, value, name: fieldName, ref }
  } = useController({ control, name, rules })

  return <AntdInput {...rest} name={fieldName} onChange={onChange} value={value} ref={ref} onBlur={onBlur} />
}

export const Select = ({ control, name, rules = {}, ...rest }) => {
  const {
    field: { onChange, onBlur, value, name: fieldName, ref }
  } = useController({ control, name, rules })

  return <AntdSelect {...rest} name={fieldName} onChange={onChange} value={value} ref={ref} onBlur={onBlur} />
}

Input.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object
}

Select.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object
}
