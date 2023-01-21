var db = require('../db')

module.exports = {

  getAnswers: (req, res) => {
    console.log('getAnswers: ', req.params.product_id)
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