import React, { useEffect, useState } from 'react'
import { List, message, Avatar, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'

import { ListWithInfiniteLoader as StyledList } from './StyledList'
import { API_ENDPOINTS } from '@shared/constants'
import request from '@shared/utils/request'

const ListWithInfiniteLoader = () => {
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchData((res) => {
      setData(res?.results)
      setList(res?.results)
      setLoading(false)
    })
  }, [])

  const fetchData = (callback) => {
    request(API_ENDPOINTS.LIST, {
      method: 'GET'
    }).then((res) => callback(res))
  }

  const handleInfiniteOnLoad = () => {
    setLoading(true)
    setList(data.concat([...new Array(3)].map(() => ({ loading: true, name: {} }))))
    if (data.length > 14) {
      message.warning('list loaded')
      setHasMore(false)
      setLoading(false)
      setList(data)
    }
    fetchData((res) => {
      const listData = data.concat(res.results)
      setData(listData)
      setList(listData)
      setLoading(false)
    })
  }

  return (
    <StyledList>
      <div className="demo-infinite-container">
        <InfiniteScroll initialLoad={false} pageStart={0} loadMore={handleInfiniteOnLoad} hasMore={!loading && hasMore} useWindow>
          <List
            dataSource={list}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta avatar={<Avatar src={API_ENDPOINTS.LIST_AVATAR} />} title={item.name.last} description={item.email} />
                </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </StyledList>
  )
}
export default ListWithInfiniteLoader
