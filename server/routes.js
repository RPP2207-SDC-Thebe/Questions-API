require("dotenv").config();
const router = require("express").Router();
const controllers = require('./controllers')

// get questions and answers
router.get('/getQuestions', controllers.questions.getQuestions)
router.get('/getAnswers', controllers.answers.getAnswers)

// post questios and answers
router.post('/postQuestion', controllers.questions.postQuestion)
router.post('/postAnswer', controllers.answers.postAnswer)

// put questions and answers report and helpfulness
router.put('/updateQuestionReport', controllers.questions.updateQuestionReport)
router.post('/updateQuestionHelpfulness', controllers.questions.updateQuestionHelpfulness)

router.put('/updateAnswerReport', controllers.answers.updateAnswerReport)
router.post('/updateAnswerHelpfulness', controllers.answers.updateAnswerHelpfulness)


module.exports = router;