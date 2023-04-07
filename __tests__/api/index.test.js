import handler from '@src/pages/api/hello'

describe('API handler', () => {
  it('should respond with a JSON object containing the name "John Doe"', async () => {
    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await handler(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ name: 'John Doe' })
  })
})
