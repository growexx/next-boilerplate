import { getUserData, userExists } from '../helper'

describe('userExists', () => {
  it('returns true', () => {
    const result = userExists()

    expect(result).toBe(true)
  })
})

describe('getUserData', () => {
  it('returns false', () => {
    const result = getUserData()

    expect(result).toBe(false)
  })
})
