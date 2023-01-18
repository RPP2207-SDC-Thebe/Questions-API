
const request = require('supertest');
const server = require('../server/index.js')

afterAll(async () => {
  console.log("... Test Ended");
  // server.close()
});


describe("Test route", () => {
  test('Test route should respond with the expected value', async () => {
    const app = await request(server).get('/test')
    // console.log(response.res.text)
    const expected = 'GT4'
    expect(app.res.text).toEqual(expected)
  });

})

