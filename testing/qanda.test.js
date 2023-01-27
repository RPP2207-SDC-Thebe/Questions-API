const request = require('supertest');
const Client = require('pg').Client;
const server = require('../server/app.js');
const Pool = require('pg').Pool;
require('dotenv').config()


describe("Test route", () => {
  test('Test route should respond with the expected value', async () => {
    const app = await request(server).get('/test')
    // console.log(response.res.text)
    const expected = 'GT4'
    expect(app.res.text).toEqual(expected)
  });
})



