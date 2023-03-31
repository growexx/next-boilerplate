import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import useDebounce from '@shared/hooks/use-debounce'

test('useDebounce returns initial value correctly', () => {
  const value = 'test value'
  const { result } = renderHook(() => useDebounce(value, 500))

  expect(result.current).toBe(value)
})

jest.useFakeTimers()

test('useDebounce returns debounced value after the delay', () => {
  const value = 'test value'
  const delay = 1000
  const { result, rerender } = renderHook((props) => useDebounce(props.value, props.delay), {
    initialProps: { value, delay }
  })

  act(() => {
    jest.advanceTimersByTime(delay - 1)
  })
  expect(result.current).toBe(value)

  const newValue = 'new value'
  rerender({ value: newValue })

  act(() => {
    jest.advanceTimersByTime(5)
  })
  expect(result.current).toBe(value)

  act(() => {
    jest.advanceTimersByTime(delay)
  })
  expect(result.current).toBe(newValue)
})

jest.useFakeTimers()

test('useDebounce clears the timeout on unmount', () => {
  const value = 'test value'
  const delay = 1000
  const { unmount } = renderHook(() => useDebounce(value, delay))
  const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout')
  unmount()
  expect(clearTimeoutSpy).toHaveBeenCalledTimes(1)
})
