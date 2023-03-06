/**
 * Convert string query params to object
 * @param params string
 * @returns Query params object
 */
export const parseParams = (params = '') => {
  const urlParams = new URLSearchParams(params)
  const value = Object.fromEntries(urlParams.entries())
  return value
}
