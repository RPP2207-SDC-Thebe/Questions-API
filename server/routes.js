require("dotenv").config();
const router = require("express").Router();
const controllers = require('./controllers')

// get questions and answers
router.get('/getQuestions', controllers.getQuestions)
router.get('/getAnswers', controllers.getAnswers)

// post questios and answers
router.post('/postQuestion', controllers.postQuestion)
router.post('/postAnswer', controllers.postAnswer)

// put questions and answers report and helpfulness
router.put('/updateQuestionReport', controllers.updateQuestionReport)
router.post('/updateQuestionHelpfulness', controllers.updateQuestionHelpfulness)

router.put('/updateAnswerReport', controllers.updateAnswerReport)
router.post('/updateAnswerHelpfulness', controllers.updateAnswerHelpfulness)


module.exports = router;