const pool = require('../db/index.js')
const getQueries = require('../db/getQueries.js')
const postQueries = require('../db/postQueries.js')
const putQueries = require('../db/putQueries.js')

module.exports = {
  getQuestions: (req, res) => {
    // if use the path format on Learn -> req.params.product_id;
    // if use THE path format in FEC -> req.query.product_id;
    //console.log('getQuestions for product_id: ', req.query.product_id)

    let product_id = req.query.product_id;
    if (!product_id) {
      res.status(400).send('product_id is undefined')
      return
    }
    let count = req.query.count || 5;
    let page = req.query.page || 1;
    let queryString = getQueries.getQuestion(product_id, count, page)
    //console.log(queryString)
    pool.query(queryString)
      .then((data) => {
        //console.log(data.rows)
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        console.log('getQuestions: ', err)
        res.status(500).send(err)
      })


  },
  postQuestion: async (req, res) => {
    console.log('postQuestion: ', req.body)
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
          res.status(200).send(`${req.params.question_id} updated`)
        }
      })
      .catch((err) => {
        console.log('updateQuestionHelpfulness err: ', err)
        res.status(500).send(err)
      })
  }
}

