import React from 'react'
import { Tabs } from 'antd'

import ListWithLoadMore from './ListWithLoadMore'
import ListWithPagination from './ListWithPagination'
import ListWithInfiniteLoader from './ListWithInfiniteLoader'
import { TABS } from './constants'
import { StyledList } from './StyledList'

const ListLoader = () => {
  const tabItems = [
    {
      label: TABS.TITLE.TAB_ONE,
      key: '1',
      children: <ListWithInfiniteLoader />
    },
    {
      label: TABS.TITLE.TAB_TWO,
      key: '2',
      children: <ListWithLoadMore />
    },
    {
      label: TABS.TITLE.TAB_THREE,
      key: '3',
      children: <ListWithPagination />
    }
  ]

  return (
    <StyledList>
      <Tabs items={tabItems} defaultActiveKey="1" data-testid="ListTab" />
    </StyledList>
  )
}

export default ListLoader
