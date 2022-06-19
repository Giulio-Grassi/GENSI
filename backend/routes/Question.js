const router = require('express').Router();
let Question = require('../models/Question.model');

router.route('/add').post((req, res) => {
    const newQuestion = new Question({
        surveyId: req.body.surveyId,
        questionType: req.body.answer.questionType,
        title: req.body.answer.title,
        answer: req.body.answer.answer
    });
    
    newQuestion.save().then(() => res.json('New QUESTION Added to Database')).catch(err => res.status(400).json('!!!    !!!!   Error ' + err));
});

module.exports = router;