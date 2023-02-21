require('dotenv').config()
const pool = require('../db/index.js')
const getQueries = require('../db/getQueries.js')
const postQueries = require('../db/postQueries.js')
const putQueries = require('../db/putQueries.js')
const getOrSetCache = require('./getSetRedis.js').getOrSetCache


module.exports = {
  getQuestions: async (req, res) => {
    // if use the path format on Learn -> req.params.product_id;
    // if use THE path format in FEC -> req.query.product_id;
    //console.log('getQuestions for product_id: ', req.query.product_id)
    let product_id = req.query.product_id;
    if (!product_id) {
      res.status(400).send('product_id is undefined')
      return
    }

    const questions = await getOrSetCache(product_id, () => {
      let count = req.query.count || 5;
      let page = req.query.page || 1;
      let queryString = getQueries.getQuestion(product_id, count, page)

      return pool.query(queryString)
        .then((data) => {
          return [200, data.rows[0].questions];
        })
        .catch((err) => {
          console.log('getQuestions: ', err)
          return [500, err]
        })
    })

    // console.log(typeof questions)
    res.status(questions[0]).send(questions[1])

  },
  postQuestion: async (req, res) => {
    //console.log('postQuestion: ', req.body)
    if (Object.keys(req.body).length === 0) {
      res.status(400).send('missing req.body')
      return
    }
    let queryString = await postQueries.postQuestion(req.body)
    //console.log(queryString)
    pool.query(queryString)
      .then((result) => {
        //console.log(result)
        if (result.command === 'INSERT' && result.rowCount === 1) {
          res.status(201).send('Question posted.')
        }
      })
      .catch((err) => {
        console.log('postQuestion err: ', err)
        res.status(500).send(err)
      })
  },
  updateQuestionReport: (req, res) => {
    //console.log('updateQuestionReport: ', req.params.question_id)
    if (!req.params.question_id || req.params.question_id === ':question_id') {
      res.status(400).send()
      return
    }
    let queryString = putQueries.updateReported(req.params.question_id, 'question_id', 'QUESTIONS')
    //console.log(queryString)

    pool.query(queryString)
      .then((result) => {
        //console.log(result)
        if (result.command === 'UPDATE' && result.rowCount === 1) {
          res.status(200).send(`${req.params.question_id} updated`)
        }
      })
      .catch((err) => {
        console.log('updateQuestionReport err: ', err)
        res.status(500).send(err)
      })
  },
  updateQuestionHelpfulness: (req, res) => {

    //console.log('updateQuestionHelpfulness: ', req.params.question_id)
    if (!req.params.question_id || req.params.question_id === ':question_id') {
      res.status(400).send()
      return
    }
    let queryString = putQueries.updateHelpfulness(req.params.question_id, 'question_id', 'question_helpfulness', 'QUESTIONS')
    //console.log(queryString)

    pool.query(queryString)
      .then((result) => {
        //console.log(result)
        if (result.command === 'UPDATE' && result.rowCount === 1) {
          //console.log('updated')
          res.status(200).send(`${req.params.question_id} updated`)
        }
      })
      .catch((err) => {
        console.log('updateQuestionHelpfulness err: ', err)
        res.status(500).send(err)
      })
  }
}


// A direct impletmentation before making the get and set cache into a resuable fuction
// //check if redis has the data, if not query postgres
    // redisClient.get(product_id)
    //   .then((data) => {
    //     if (data !== null) {
    //       //console.log('fetching Redis')
    //       res.status(200).send(JSON.parse(data))
    //     } else {
    //       //console.log('fetching Postgres')
    //       let count = req.query.count || 5;
    //       let page = req.query.page || 1;
    //       let queryString = getQueries.getQuestion(product_id, count, page)
    //       //console.log(queryString)
    //       pool.query(queryString)
    //         .then((data) => {
    //           // save to redis
    //           redisClient.set(product_id, JSON.stringify(data.rows[0].questions))
    //           redisClient.expire(product_id, DEFAULT_EXPIRATION)
    //           res.status(200).send(data.rows[0].questions);
    //         })
    //         .catch((err) => {
    //           console.log('getQuestions: ', err)
    //           res.status(500).send(err)
    //         })
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('redis error: ', err)
    //   })