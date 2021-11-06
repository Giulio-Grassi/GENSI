const router = require('express').Router();
let Test = require('../models/Test.model');

router.route('/add').get((req, res) => {
    const newTest = new Test({
        name: "geronimo",
    });
    
    newTest.save().then(() => res.json('New TEST ITEM Added to Database')).catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;