import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

const useApp = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      handleStop()
    }
    const handleStart = () => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeError', handleStop)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router.events])

  return {}
}
export default useApp
