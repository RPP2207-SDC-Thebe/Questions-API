
const request = require('supertest');
const server = require('../server/index.js')

describe("Jest default test", () => {
  test('check if server.js responds', async () => {
    const response = await request(server).get('/test')
    // console.log(response.res.text)
    const expected = 'GT4'
    expect(response.res.text).toEqual(expected)
  });
})
