const router = require('express').Router();
let Tokyo = require('../models/Tokyo.model');

router.route('/add').get((req, res) => {
    const newTokyo = new Tokyo({
        name: "geronimo",
    });
    
    newTokyo.save().then(() => res.json('New TOKYO ITEM Added to Database')).catch(err => res.status(400).json('!!!    !!!!   Error ' + err));
    res.redirect('http://google.com')
});

module.exports = router;