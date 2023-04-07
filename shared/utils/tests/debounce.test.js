import { debounce } from '../debounce'

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('should debounce the function', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 500)
    debouncedFn()
    jest.advanceTimersByTime(500)
    expect(mockFn).toBeCalled()
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
