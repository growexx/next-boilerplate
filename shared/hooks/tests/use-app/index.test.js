import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import useApp from '@shared/hooks/use-app'
import { renderHook } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('nprogress', () => ({
  start: jest.fn(),
  done: jest.fn()
}))

describe('useApp', () => {
  let router
  let addEventListener
  let removeEventListener
  let handleRouteChange
  let handleStart
  let handleStop

  beforeEach(() => {
    router = {
      events: {
        on: jest.fn(),
        off: jest.fn()
      }
    }
    addEventListener = jest.spyOn(router.events, 'on')
    removeEventListener = jest.spyOn(router.events, 'off')
    useRouter.mockReturnValue(router)

    handleRouteChange = jest.fn()
    handleStart = jest.fn()
    handleStop = jest.fn()
  })

  afterEach(() => {
    addEventListener.mockReset()
    removeEventListener.mockReset()
    handleRouteChange.mockReset()
    handleStart.mockReset()
    handleStop.mockReset()
    NProgress.start.mockReset()
    NProgress.done.mockReset()
  })

  it('should add event listeners on mount and remove them on unmount', () => {
    const { unmount } = renderHook(() => useApp())

    expect(addEventListener).toHaveBeenCalledWith('routeChangeComplete', expect.any(Function))
    expect(addEventListener).toHaveBeenCalledWith('routeChangeStart', expect.any(Function))
    expect(addEventListener).toHaveBeenCalledWith('routeChangeError', expect.any(Function))

    unmount()

    expect(removeEventListener).toHaveBeenCalledWith('routeChangeComplete', expect.any(Function))
    expect(removeEventListener).toHaveBeenCalledWith('routeChangeStart', expect.any(Function))
    expect(removeEventListener).toHaveBeenCalledWith('routeChangeError', expect.any(Function))
  })

  it('should call NProgress.start on routeChangeStart event', () => {
    renderHook(() => useApp())

    router.events.on.mock.calls[1][1]()
    expect(NProgress.start).toHaveBeenCalled()
  })

  it('should call NProgress.done on routeChangeComplete event', () => {
    renderHook(() => useApp())

    router.events.on.mock.calls[0][1]('/new-page')
    expect(NProgress.done).toHaveBeenCalled()
  })

  it('should call NProgress.done on routeChangeError event', () => {
    renderHook(() => useApp())

    router.events.on.mock.calls[2][1]()
    expect(NProgress.done).toHaveBeenCalled()
  })
})
