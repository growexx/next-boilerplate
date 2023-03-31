import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { useController, useForm } from 'react-hook-form'
import userEvent from '@testing-library/user-event'

import { Input } from '../Fields'

describe('Input', () => {
  const { result } = renderHook(() => useForm())
  const name = 'inputName'
  const control = result.current.control
  const { result: controlResult } = renderHook(() => useController({ control, name }))
  const { field } = controlResult.current
  const onChangeMock = jest.fn()

  field.onChange = jest.fn().mockImplementation((event) => {
    onChangeMock(event.target.value)
    return event
  })

  it('renders without crashing', () => {
    render(<Input control={control} name={name} />)
  })

  it('passes the name prop to the underlying AntdInput component', () => {
    render(<Input control={control} name={name} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('name', name)
  })

  it('passes the onChange prop to the underlying AntdInput component', () => {
    render(<Input control={control} name={name} />)
    userEvent.type(screen.getByRole('textbox'), 'test')
    expect(onChangeMock).toHaveBeenCalledTimes(4)
  })

  it('passes the value prop to the underlying AntdInput component', () => {
    control._fields.value = 'initial value'
    render(<Input control={control} name={name} />)
    expect(screen.getByRole('textbox')).toHaveValue(control._fields.value)
  })

  it('passes the ref prop to the underlying AntdInput component', () => {
    const ref = React.createRef()
    render(<Input control={control} name={name} ref={ref} />)
    expect(ref.current).toBe(screen.getByRole('textbox'))
  })

  it('passes the onBlur prop to the underlying AntdInput component', () => {
    render(<Input control={control} name={name} />)
    userEvent.tab()
    expect(control.field.onBlur).toHaveBeenCalledTimes(1)
  })

  it('throws an error if the control prop is not provided', () => {
    expect(() => render(<Input name={name} />)).toThrow()
  })

  it('throws an error if the name prop is not provided', () => {
    expect(() => render(<Input control={control} />)).toThrow()
  })

  it('accepts optional rules prop with correct PropTypes definition', () => {
    expect(Input.propTypes.rules).toBeDefined()
  })
})
