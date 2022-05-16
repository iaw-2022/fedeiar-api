const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

// ---------------------------------------------- INDEX  ----------------------------------------------

app.get('/', (request, response) => {
    response.send("Welcome to the API!");
});

// ---------------------------------------------- ROUTES ----------------------------------------------

app.use(require('./routes/userRoutes.js'));
app.use(require('./routes/gameRoutes.js'));
app.use(require('./routes/categoryRoutes.js'));
app.use(require('./routes/videoRoutes.js'));

// ---------------------------------------------- SERVER ----------------------------------------------

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Listening on port '+PORT+'...'));