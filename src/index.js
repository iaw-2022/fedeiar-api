const dotenv = require('dotenv');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");


dotenv.config();
app.use(bodyParser.json());


// ROUTES

app.use(require('./routes.js'))

// ---------------------------------------------- SERVER ----------------------------------------------

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Listening on port '+PORT+'...'));