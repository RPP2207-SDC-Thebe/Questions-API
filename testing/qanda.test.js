const request = require('supertest');
const server = require('../server/app.js');
require('dotenv').config()

// const Client = require('pg').Client;
// const Pool = require('pg').Pool;


describe("Express Server", () => {
  test('Express server should respond with the expected value', async () => {
    const app = await request(server).get('/test')
    //console.log(app.res)
    const expected = 'OK'
    expect(app.res.text).toEqual(expected)
    expect(app.res.statusCode).toBe(200)
  });
})
describe("Sad path: End points", () => {
  describe("GET", () => {
    test('/qa/questions? should return 400 if product_id is not provided', async () => {
      const app = await request(server).get(`/qa/questions?`)
      //console.log(app.res)
      expect(app.res.statusCode).toBe(400)
    });
    // test('/questions/:question_id/answers should return 400 if product_id is not provided', async () => {
    //   const app = await request(server).get('/questions/:question_id/answers')
    //   //console.log(app.res)
    //   expect(app.res.statusCode).toBe(400)
    // });
  })
})



