import { useQuery } from '@tanstack/react-query'

import axiosInstance from '@shared/libs/axios'

const fetchPosts = async (limit) => {
  const { data } = await axiosInstance.get(`/posts?_limit=${limit}`)
  return data
}

const usePosts = (limit) => {
  return useQuery(['getPosts'], () => fetchPosts(limit))
}

export { usePosts, fetchPosts }
