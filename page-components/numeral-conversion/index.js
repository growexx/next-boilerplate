import React, { useState } from 'react'
import { Input, Table } from 'antd'
import numeral from 'numeral'

import {
  CREATE_COLUMNS,
  FORMAT_COLUMNS,
  NUMBERS_FORMAT,
  CURRENCY_FORMAT,
  BYTES_FORMAT,
  TIME_FORMAT,
  EXPONENTIAL_FORMAT,
  PERCENTAGES_FORMAT
} from './constants'
import { StyledHeader, StyledTableContainer, StyledFormatHeader, StyledInput } from './StyledNumeralConversion'

const { Search } = Input

const NumeralConversion = () => {
  const [value, setValue] = useState(0)

  const createData = () => [
    {
      key: '1',
      input: value,
      value: numeral(value).value()
    }
  ]
  const numbersData = () =>
    NUMBERS_FORMAT.map((number, index) => ({
      key: index,
      number: value,
      format: number,
      string: numeral(value).format(number)
    }))
  const currencyData = () =>
    CURRENCY_FORMAT.map((number, index) => ({
      key: index,
      number: value,
      format: number,
      string: numeral(value).format(number)
    }))
  const bytesData = () =>
    BYTES_FORMAT.map((number, index) => ({
      key: index,
      number: value,
      format: number,
      string: numeral(value).format(number)
    }))
  const percentagesData = () =>
    PERCENTAGES_FORMAT.map((number, index) => ({
      key: index,
      number: value,
      format: number,
      string: numeral(value).format(number)
    }))
  const timeData = () =>
    TIME_FORMAT.map((number, index) => ({
      key: index,
      number: value,
      format: number,
      string: numeral(value).format(number)
    }))
  const exponentialData = () =>
    EXPONENTIAL_FORMAT.map((number, index) => ({
      key: index,
      number: value,
      format: number,
      string: numeral(value).format(number)
    }))
  const onSearch = (value) => setValue(value)

  return (
    <div>
      <StyledHeader>This demo uses numeral library for conversion of number</StyledHeader>
      <StyledInput>
        <Search
          placeholder="Enter number to convert"
          onSearch={onSearch}
          enterButton="GO"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          value={value}
        />
      </StyledInput>
      <StyledTableContainer>
        <p>Create</p>
        <p>Create an instance of a numeral. Numeral takes numbers or strings that it trys to convert into a number</p>
        <Table scroll={{ x: 350 }} pagination={false} columns={CREATE_COLUMNS} dataSource={createData()} />
      </StyledTableContainer>
      <StyledFormatHeader>
        <p>Format</p>
        <p>
          Numbers can be formatted to look like currency, percentages, times, or even plain old numbers with decimal places, thousands, and
          abbreviations.
        </p>
      </StyledFormatHeader>
      <StyledTableContainer>
        <p>Numbers</p>
        <Table aria-label="Numbers" scroll={{ x: 350 }} pagination={false} columns={FORMAT_COLUMNS} dataSource={numbersData()} />
      </StyledTableContainer>
      <StyledTableContainer>
        <p>Currency</p>
        <Table scroll={{ x: 350 }} pagination={false} columns={FORMAT_COLUMNS} dataSource={currencyData()} />
      </StyledTableContainer>
      <StyledTableContainer>
        <p>Bytes</p>
        <Table scroll={{ x: 350 }} pagination={false} columns={FORMAT_COLUMNS} dataSource={bytesData()} />
      </StyledTableContainer>
      <StyledTableContainer>
        <p>Percentages</p>
        <Table scroll={{ x: 350 }} pagination={false} columns={FORMAT_COLUMNS} dataSource={percentagesData()} />
      </StyledTableContainer>
      <StyledTableContainer>
        <p>Time</p>
        <Table scroll={{ x: 350 }} pagination={false} columns={FORMAT_COLUMNS} dataSource={timeData()} />
      </StyledTableContainer>
      <StyledTableContainer>
        <p>Exponential</p>
        <Table scroll={{ x: 350 }} pagination={false} columns={FORMAT_COLUMNS} dataSource={exponentialData()} />
      </StyledTableContainer>
    </div>
  )
}

export default NumeralConversion
