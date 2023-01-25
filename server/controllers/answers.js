var pool = require('../db')
const getQueries = require('../db/getQueries.js')
const postQueries = require('../db/postQueries.js')

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
    console.log('postAnswer: ', req.params.question_id, req.body)
    let queryString = postQueries.postAnswer(req.params.question_id, req.body)
    pool.query(queryString)
      .then((result) => {
        //console.log(result)
        if (req.body.photos.length === 0 && result.command === 'INSERT' && result.rowCount === 1) {
          res.status(201).send('Answer posted.')
        } else {
          // inser photos in photo array
          //console.log(result.rows[0].answer_id)
          let answer_id = result.rows[0].answer_id
          let insertArray = []
          for (let i = 0; i < req.body.photos.length; i++) {
            let queryString = postQueries.postPhoto(answer_id, req.body.photos[i])
            insertArray.push(pool.query(queryString))
          }

          Promise.all(insertArray)
            .then((result) => {
              //console.log(result, insertArray.length)
              if (result.length === insertArray.length) {
                res.status(201).send('Photos posted.')
              }
            })
            .catch((err) => {
              console.log('Promise.all insert error: ', err)
              res.status(500).send(err)
            })
        }
      })
      .catch((err) => {
        console.log('postAnswer err: ', err)
        res.status(500).send(err)
      })
  },
  updateAnswerReport: (req, res) => {
    console.log('updateAnswerReport: ', req)
  },
  updateAnswerHelpfulness: (req, res) => {
    console.log('updateAnswerHelpfulness: ', req)
  }

}