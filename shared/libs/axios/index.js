import axios from 'axios'
import { notification } from 'antd'

// import { parseParams } from '@shared/utils/parseParams'

// const baseURL = process.env.REACT_APP_API_URL
const baseURL = 'https://jsonplaceholder.typicode.com'

const axiosInstance = axios.create({
  baseURL
})

// const params = parseParams(window.location.search)

axiosInstance.interceptors.request.use(
  (req) => {
    // TODO: add token to request
    // const token = localStorage.getItem('userToken')
    // if (params.token) {
    // req.headers.Authorization = params.token
    // } else
    // if (!req.url.includes('https') && token) {
    //   req.headers.Authorization = token
    //   return req
    // }
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    notification.error({
      message: error?.response ? error?.response?.data?.message : 'Server Error'
    })
    if (error.response && (error.response.status === 417 || error.response.status === 401)) {
      localStorage.clear()
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
