import { Divider, Row, Skeleton, Space } from 'antd'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

import BarCharts from './BarCharts'
import { PeriodDropDown, PERIOD_OPTIONS } from './constants'
import PieCharts from './PieCharts'
import Statistics from './Statistics'

const PageHeader = dynamic(() => import('@ant-design/pro-components').then((mod) => mod.PageHeader), {
  ssr: false,
  loading: () => <Skeleton.Input active block />
})

const Charts = () => {
  const [period, setPeriod] = useState('currentMonth')

  const onPeriodChange = (period) => {
    setPeriod(period)
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        className="CommonClasses.PageHeader"
        extra={[
          <div className="CommonClasses.filters" key={period}>
            <Space className={`${'CommonClasses.filterItem'} align-middle m-1`}>
              <PeriodDropDown placeholder="Period" onChange={onPeriodChange} options={PERIOD_OPTIONS} value={period} />
            </Space>
          </div>
        ]}
      />
      <div>
        <Statistics period={period} />
        <Divider width="auto" />
        <Row className="m-1 d-flex justify-content-center flex-row align-items-start" wrap>
          <PieCharts className="Classes.PieChatItem" key={`category-${period}`} title="Sales by Category" period={period} type="category" />
          <PieCharts
            className="Classes.PieChatItem"
            key={`university-${period}`}
            title="Sales by University"
            period={period}
            type="university"
          />
          <BarCharts title="Sign up" period={period} />
        </Row>
      </div>
    </div>
  )
}

export default Charts
