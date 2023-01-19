require("dotenv").config();
const router = require("express").Router();
const controllers = require('./controllers')

// get questions and answers
router.get('', controllers.getQuestions)
router.get('', controllers.getAnswers)

// post questios and answers
router.post('', controllers.postQuestion)
router.post('', controllers.postAnswer)

// put questions and answers report and helpfulness
router.put('', controllers.updateQuestionReport)
router.post('', controllers.updateQuestionHelpfulness)

router.put('', controllers.updateAnswerReport)
router.post('', controllers.updateAnswerHelpfulness)


module.exports = router;