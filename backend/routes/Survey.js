const router = require('express').Router();
let Survey = require('../models/Survey.model');

router.route('/add').get((req, res) => {
    const newSurvey = new Survey({
        answer: req.body
    });
    
    newSurvey.save().then(() => res.json('New SURVEY Added to Database')).catch(err => res.status(400).json('!!!    !!!!   Error ' + err));
});

module.exports = router;