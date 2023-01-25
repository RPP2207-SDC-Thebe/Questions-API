require("dotenv").config();
const router = require("express").Router();
const controllers = require('./controllers')

// get questions and answers
router.get('/questions/:product_id', controllers.questions.getQuestions)
router.get('/answers/:question_id', controllers.answers.getAnswers)

// post questios and answers
router.post('/questions', controllers.questions.postQuestion)
router.post('/questions/:question_id/answers', controllers.answers.postAnswer)

// put questions and answers report and helpfulness
router.put('/questions/:question_id/report', controllers.questions.updateQuestionReport)
router.put('/questions/:question_id/helpful', controllers.questions.updateQuestionHelpfulness)

router.put('/answers/:answer_id/report', controllers.answers.updateAnswerReport)
router.put('/answers/:answer_id/helpful', controllers.answers.updateAnswerHelpfulness)


module.exports = router;