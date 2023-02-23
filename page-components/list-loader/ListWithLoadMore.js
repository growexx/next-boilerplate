import React, { useEffect, useState } from 'react'
import { List, Avatar, Button, Skeleton } from 'antd'

import request from '@shared/utils/request'
import { API_ENDPOINTS } from '@shared/constants'

const count = 3

const ListWithLoadMore = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [initLoading, setInitLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    getData((res) => {
      setInitLoading(false)
      setData(res.results)
      setList(res.results)
    })
  }, [])

  const getData = (callback) => {
    request(API_ENDPOINTS.LIST, {
      method: 'GET'
    }).then((res) => {
      callback(res)
    })
  }

  const onLoadMore = () => {
    setLoading(true)
    setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))))
    getData((res) => {
      const listData = data.concat(res.results)
      setLoading(false)
      setList(listData)
      setData(listData, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        // window.dispatchEvent(new Event('resize'))
      })
    })
  }

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px'
        }}
      >
        <Button aria-label="load-more" onClick={onLoadMore}>
          load more
        </Button>
      </div>
    ) : null

  return (
    <List
      className="demo-load-more-list"
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta avatar={<Avatar src={API_ENDPOINTS.LIST_AVATAR} />} title={item.name.last} description={item.email} />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}

export default ListWithLoadMore
