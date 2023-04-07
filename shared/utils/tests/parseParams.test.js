import { parseParams } from '../parseParams'

describe('parseParams', () => {
  it('should parse query params into an object', () => {
    const params = 'foo=bar&baz=qux'
    const expected = { foo: 'bar', baz: 'qux' }
    const result = parseParams(params)
    expect(result).toEqual(expected)
  })

  it('should handle a single query param', () => {
    const params = 'foo=bar'
    const expected = { foo: 'bar' }
    const result = parseParams(params)
    expect(result).toEqual(expected)
  })

  it('should handle empty query params', () => {
    const params = ''
    const expected = {}
    const result = parseParams(params)
    expect(result).toEqual(expected)
  })

  it('should handle URL encoded values', () => {
    const params = 'foo=hello%20world&bar=%2Fpath%2Fto%2Ffile'
    const expected = { foo: 'hello world', bar: '/path/to/file' }
    const result = parseParams(params)
    expect(result).toEqual(expected)
  })
})
