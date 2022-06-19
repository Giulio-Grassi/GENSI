const router = require('express').Router();
let Survey = require('../models/Survey.model');

router.route('/add').post((req, res) => {
    console.log(req.body)
    const newSurvey = new Survey({
        surveyId : req.body.surveyId,
        result: req.body.totalAnswers
    });
    
    newSurvey.save().then(() => res.json('New SURVEY Added to Database')).catch(err => res.status(400).json('!!!    !!!!   Error ' + err));
});

module.exports = router;