import axiosInstance from '../index'

describe('axiosInstance', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('the base URL is set correctly', () => {
    expect(axiosInstance.defaults.baseURL).toBe('https://jsonplaceholder.typicode.com')
  })

  test('the request interceptor sets the authorization header correctly', () => {
    const req = {
      headers: {}
    }
    const updatedReq = axiosInstance.interceptors.request.handlers[0].fulfilled(req)
    expect(updatedReq.headers).toEqual({})
  })

  test('the response interceptor handles error responses correctly', async () => {
    const error = new Error('Network Error')
    error.response = {
      status: 500,
      data: {
        message: 'Internal Server Error'
      }
    }
    await expect(axiosInstance.interceptors.response.handlers[0].rejected(error)).rejects.toEqual(error)
  })
})
