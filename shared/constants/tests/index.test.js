import { GET_SORT_ORDER, LAYOUT_CONFIG, showLogoInSideBar, SORTING } from '../index'

describe('showLogoInSideBar', () => {
  test('should return true for currentVariant other than VERTICAL_OPTION_2 or HORIZONTAL_OPTION_1', () => {
    expect(showLogoInSideBar('testVariant')).toBe(true)
    expect(showLogoInSideBar(null)).toBe(true)
    expect(showLogoInSideBar(undefined)).toBe(true)
  })

  test('should return false for currentVariant VERTICAL_OPTION_2 or HORIZONTAL_OPTION_1', () => {
    expect(showLogoInSideBar(LAYOUT_CONFIG.VERTICAL_OPTION_2)).toBe(false)
    expect(showLogoInSideBar(LAYOUT_CONFIG.HORIZONTAL_OPTION_1)).toBe(false)
  })
})

describe('GET_SORT_ORDER', () => {
  test('should return ASC for order "ascend"', () => {
    expect(GET_SORT_ORDER('ascend')).toBe(SORTING.ASC)
  })

  test('should return DESC for order "descend"', () => {
    expect(GET_SORT_ORDER('descend')).toBe(SORTING.DESC)
  })

  test('should return DESC for any other order value', () => {
    expect(GET_SORT_ORDER(null)).toBe(SORTING.DESC)
    expect(GET_SORT_ORDER(undefined)).toBe(SORTING.DESC)
    expect(GET_SORT_ORDER('invalidOrder')).toBe(SORTING.DESC)
  })
})
