const express = require('express');
const path = require('path');
const cors = require('cors');
const Mongoose = require('mongoose');

//DATABASE CONNECTION SETUB
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));
/*
const uri = process.env.ATLAS_URI;
Mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = Mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
});
*/
//ROUTES
//const contactUs = require('./routes/Contactus');


//app.use('/api/contactus', contactUs);


/*app.get('*', (req, res) => {
  res.status(404).json("No routes match.")
  console.log("META TAG DEBUG req", req)
});*/


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})