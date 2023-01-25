var pool = require('../db')
const getQueries = require('../db/getQueries.js')

module.exports = {

  getAnswers: (req, res) => {
    console.log('getAnswers for question_id: ', req.params.question_id)
    let question_id = req.params.question_id;
    let count = req.query.count || 5;
    let page = req.query.page || 1;
    let queryString = getQueries.getAnswer(question_id, count, page)

    pool.query(queryString)
      .then((data) => {
        console.log(data.rows)
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        console.log('getAnswers: ', err)
        res.status(500).send(err)
      })
  },
  postAnswer: (req, res) => {
    console.log('postAnswer: ', req)
  },
  updateAnswerReport: (req, res) => {
    console.log('updateAnswerReport: ', req)
  },
  updateAnswerHelpfulness: (req, res) => {
    console.log('updateAnswerHelpfulness: ', req)
  }

}