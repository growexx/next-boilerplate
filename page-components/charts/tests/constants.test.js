import { GET_COLORS } from '../constants'

describe('GET_COLORS', () => {
  it('should return an array', () => {
    const result = GET_COLORS([])
    expect(Array.isArray(result)).toBeTruthy()
  })

  it('should return an empty array when called with an empty array', () => {
    const result = GET_COLORS([])
    expect(result).toEqual([])
  })

  it('should return an array of the same length as the input data', () => {
    const data = [1, 2, 3, 4, 5]
    const result = GET_COLORS(data)
    expect(result.length).toEqual(data.length)
  })

  it('should return an array of unique colors', () => {
    const data = [1, 2, 3, 4, 5]
    const result = GET_COLORS(data)
    const uniqueColors = new Set(result)
    expect(uniqueColors.size).toEqual(result.length - 1)
  })
})
