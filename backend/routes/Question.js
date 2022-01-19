const router = require('express').Router();
let Survey = require('../models/Question.model');

router.route('/add').post((req, res) => {
    if(req.body.title){
        const newQuestion = new Question({
            surveyId: req.body.surveyId,
            questionType: req.body.questionType,
            title: req.body.title,
            answer: req.body.answer
        });
    }else{
        const newQuestion = new Question({
            surveyId: req.body.surveyId,
            questionType: req.body.questionType,
            answer: req.body.answer
        });
    }
    
    newQuestion.save().then(() => res.json('New QUESTION Added to Database')).catch(err => res.status(400).json('!!!    !!!!   Error ' + err));
});

module.exports = router;