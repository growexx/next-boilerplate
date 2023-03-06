import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Skeleton, Space } from 'antd'

import { GET_COLORS, PieChartItem, PieChartRow } from './constants'
import { getAPIMock } from './stub/index'

const PieCharts = ({ title, period }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const colorGenerator = GET_COLORS(data)

  useEffect(() => {
    getStatistics()
  }, [period])

  const getStatistics = (newPeriod) => {
    const queryPeriod = newPeriod || period
    setIsLoading(true)
    getAPIMock({ queryPeriod }).then((response) => {
      setData(response.data)
      setIsLoading(false)
    })
  }

  const getPieChart = (data, colorGenerator) => {
    return (
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={180} fill="#8884d8" dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorGenerator[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return (
    <PieChartItem className="d-flex justify-content-center flex-column">
      <h4>{title}</h4>
      {isLoading ? (
        <Space className="d-flex justify-content-around flex-row m-2">
          <Skeleton.Button style={{ width: 250, height: 250 }} active={isLoading} size="large" shape="circle" />
        </Space>
      ) : (
        <PieChartRow>{getPieChart(data, colorGenerator)}</PieChartRow>
      )}
    </PieChartItem>
  )
}

PieCharts.propTypes = {
  period: PropTypes.string,
  title: PropTypes.string
}

export default PieCharts
