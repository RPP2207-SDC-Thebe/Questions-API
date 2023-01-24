const pool = require('../db/index.js')
const queries = require('../db/queries.js')

module.exports = {
  getQuestions: (req, res) => {
    console.log('getQuestions for product_id: ', req.params.product_id)
    let product_id = req.params.product_id;
    let count = req.query.count || 5;
    let page = req.query.page || 1;
    let queryString = queries.getQuestion(product_id, count, page)
    // console.log(queryString)
    pool.query(queryString)
      .then((data) => {
        console.log(data.rows)
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        console.log('getQuestions: ', err)
        res.status(500).send(err)
      })


  },
  postQuestion: (req, res) => {
    console.log('postQuestion: ', req)
  },
  updateQuestionReport: (req, res) => {
    console.log('updateQuestionReport: ', req)
  },
  updateQuestionHelpfulness: (req, res) => {
    console.log('updateQuestionHelpfulness: ', req)
  }

}