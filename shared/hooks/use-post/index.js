import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@shared/libs/axios'

const fetchPost = async (id) => {
  const { data } = await axiosInstance.get(`/posts/${id}`)
  return data
}

const usePost = (id) => {
  return useQuery(['getPost', id], () => fetchPost(id))
}

export { usePost, fetchPost }
