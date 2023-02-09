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
describe("Sad path on End Points, CREATE, READ, UPDATE operations", () => {
  describe("GET", () => {
    test('Get questions should return 400 if product_id is not provided', async () => {
      const app = await request(server).get(`/qa/questions?`)
      expect(app.res.statusCode).toBe(400)
    });

    test('Get questions should return 500 if product_id is invalid', async () => {
      const app = await request(server).get(`/qa/questions?`).query({ product_id: 'seven-7177' })
      expect(app.res.statusCode).toBe(500)
      expect(app.res.statusMessage).toEqual('Internal Server Error')
    });
    test('Get answers should return 400 if product_id is not provided', async () => {
      const app = await request(server).get('/qa/questions/:question_id/answers')
      expect(app.res.statusCode).toBe(400)
    });
    test('Get answers should return 500 if question_id is invalid', async () => {
      const expectedQuestion_id = '35-one-8964'
      const app = await request(server).get(`/qa/questions/${expectedQuestion_id}/answers`)
      expect(app.res.statusCode).toBe(500)
      expect(app.res.statusMessage).toEqual('Internal Server Error')
    });
  })

  describe("POST", () => {
    test('Post questions should return 400 if req.body is not provided', async () => {
      const app = await request(server).post(`/qa/questions`)
      expect(app.res.statusCode).toBe(400)
    });
    test('Post questions should return 500 if given data is invalid.', async () => {
      const insertData = {
        product_id: '77-one-77',
        body: "what is this product?",
        name: "midnight_tester",
        email: "test@gmail.com"
      }
      const app = await request(server).post(`/qa/questions`).send(insertData)
      expect(app.res.statusCode).toBe(500)
      expect(app.res.statusMessage).toEqual('Internal Server Error')
    });

    test('Post answers should return 400 if req.body is not provided', async () => {
      const app = await request(server).post(`/qa/questions/:question_id/answers`)
      expect(app.res.statusCode).toBe(400)
    });
    test('Post answers should return 500 if given data is invalid.', async () => {
      const expectedQuestion_id = '35-one-8964'
      const insertData = {
        body: "I know the answer",
        name: "smartkid",
        email: "smartkid@gmail.com",
        photos: []
      }
      const app = await request(server).post(`/qa/questions/${expectedQuestion_id}/answers`).send(insertData)
      expect(app.res.statusCode).toBe(500)
      expect(app.res.statusMessage).toEqual('Internal Server Error')
    });

    test('Post photos should return 500 if given data is invalid.', async () => {
      const expectedQuestion_id = 13518964
      const insertData = {
        body: "I have some photos could answer your question",
        name: "smartkid1",
        email: "smartkid1@gmail.com",
        photos: [
          ["https://i.ibb.co/qyjLsQJ/9d84af8321dc1b02d8165e916e2a6d8f.jpg"],
          ["https://i.ibb.co/qyjLsQJ/9d84af8321dc1b02d8165e916e2a6d8f.jpg"]
        ]
      }
      const app = await request(server).post(`/qa/questions/${expectedQuestion_id}/answers`).send(insertData)
      expect(app.res.statusCode).toBe(500)
      expect(app.res.statusMessage).toEqual('Internal Server Error')
    });
  })

  describe("PUT", () => {
    test('Update question report should return 400 if req.body is not provided', async () => {
      const app = await request(server).put(`/qa/questions/:question_id/report`)
      expect(app.res.statusCode).toBe(400)
    });

    test('Update question helpfulness should return 400 if req.body is not provided', async () => {
      const app = await request(server).put(`/qa/questions/:question_id/helpful`)
      // console.log(app.res)
      expect(app.res.statusCode).toBe(400)
    });

    test('Update answer report should return 400 if req.body is not provided', async () => {
      const app = await request(server).put(`/qa/answers/:answer_id/report`)
      // console.log(app.res)
      expect(app.res.statusCode).toBe(400)
    });

    test('Update answer helpfulness should return 400 if req.body is not provided', async () => {
      const app = await request(server).put(`/qa/answers/:answer_id/helpful`)
      // console.log(app.res)
      expect(app.res.statusCode).toBe(400)
    });

    test('should return 500 if Update question report fails.', async () => {
      const question_id = '351896-four'
      const app = await request(server).put(`/qa/questions/${question_id}/report`)
      expect(app.res.statusCode).toBe(500)
      expect(app.res.statusMessage).toEqual('Internal Server Error')
    })

    test('should return 500 if Update question helpfulness fails.', async () => {
      const question_id = '351896-four'
      const app = await request(server).put(`/qa/questions/${question_id}/helpful`)
      expect(app.res.statusCode).toBe(500)
      expect(app.res.statusMessage).toEqual('Internal Server Error')
    })

    test('should return 500 if Update answer report fails.', async () => {
      const answer_id = '687931-seven'
      const app = await request(server).put(`/qa/answers/${answer_id}/report`)
      expect(app.res.statusCode).toBe(500)
      expect(app.res.statusMessage).toEqual('Internal Server Error')
    })

    test('should return 500 if Update answer helpfulness fails.', async () => {
      const answer_id = '687931-seven'
      const app = await request(server).put(`/qa/answers/${answer_id}/helpful`)
      expect(app.res.statusCode).toBe(500)
      expect(app.res.statusMessage).toEqual('Internal Server Error')
    })
  })
})

describe("Happy path on End Points, CREATE, READ, UPDATE operations", () => {
  describe("GET", () => {
    test('Get questions should return statuscode 200, json content type and result from DB if get operation is succeeded.', async () => {
      const app = await request(server).get(`/qa/questions`).query({ product_id: 77177 })

      const expectedProduct_id = 77177
      const actual = JSON.parse(app.res.text)

      expect(app.res.statusCode).toBe(200)
      expect(app.res.headers['content-type']).toEqual(expect.stringContaining("json"))
      expect(actual[0]['questions']['product_id']).toEqual(expectedProduct_id)
    });


    test('Get answers should return statuscode 200, json content type and result from DB if get operation is succeeded.', async () => {
      const expectedQuestion_id = 3518964
      const app = await request(server).get(`/qa/questions/${expectedQuestion_id}/answers`)

      const actual = JSON.parse(app.res.text)
      //console.log(app.res)
      expect(app.res.statusCode).toBe(200)
      expect(app.res.headers['content-type']).toEqual(expect.stringContaining("json"))
      expect(actual[0]['answers']['question']).toEqual(expectedQuestion_id)
    });
  })

  describe("POST", () => {
    test('Post questions should return statuscode 201 if get operation is succeeded.', async () => {
      const insertData = {
        product_id: 77177,
        body: "what is this product?",
        name: "midnight_tester",
        email: "test@gmail.com"
      }

      const app = await request(server).post(`/qa/questions`).send(insertData)
      expect(app.res.statusCode).toBe(201)
    });

    test('Post answers should return statuscode 201 and "Answer posted." if request body has no photo url and is succeeded.', async () => {
      const expectedQuestion_id = 3518964
      const insertData = {
        body: "I know the answer",
        name: "smartkid",
        email: "smartkid@gmail.com",
        photos: []
      }
      const app = await request(server).post(`/qa/questions/${expectedQuestion_id}/answers`).send(insertData)
      expect(app.res.statusCode).toBe(201)
      expect(app.res.text).toEqual('Answer posted.')
    });

    test('Post answers should return statuscode 201 and "Answer and photos posted." if request body has photo urls and is succeeded.', async () => {
      const expectedQuestion_id = 3518964
      const insertData = {
        body: "I have some photos could answer your question",
        name: "smartkid1",
        email: "smartkid1@gmail.com",
        photos: [
          "https://i.ibb.co/qyjLsQJ/9d84af8321dc1b02d8165e916e2a6d8f.jpg",
          "https://i.ibb.co/qyjLsQJ/9d84af8321dc1b02d8165e916e2a6d8f.jpg"
        ]
      }
      const app = await request(server).post(`/qa/questions/${expectedQuestion_id}/answers`).send(insertData)
      expect(app.res.statusCode).toBe(201)
      expect(app.res.text).toEqual('Answer and photos posted.')
    });
  })

  describe("PUT", () => {
    test('Update question report should return 200 and indicate question_id updated if put request is succeeded.', async () => {
      const question_id = 3518964
      const app = await request(server).put(`/qa/questions/${question_id}/report`)
      expect(app.res.statusCode).toBe(200)
      expect(app.res.text).toEqual(`${question_id} updated`)
    })

    test('Update question helpfulness should return 200 and indicate question_id updated if put request is succeeded.', async () => {
      const question_id = 3518964
      const app = await request(server).put(`/qa/questions/${question_id}/helpful`)
      expect(app.res.statusCode).toBe(200)
      expect(app.res.text).toEqual(`${question_id} updated`)
    })

    test('Update answer report should return 200 and indicate answer_id updated if put request is succeeded.', async () => {
      const answer_id = 6879317
      const app = await request(server).put(`/qa/answers/${answer_id}/report`)
      expect(app.res.statusCode).toBe(200)
      expect(app.res.text).toEqual(`${answer_id} updated`)
    })

    test('Update answer report should return 200 and indicate answer_id updated if put request is succeeded.', async () => {
      const answer_id = 6879317
      const app = await request(server).put(`/qa/answers/${answer_id}/helpful`)
      expect(app.res.statusCode).toBe(200)
      expect(app.res.text).toEqual(`${answer_id} updated`)
    })
  })
})

