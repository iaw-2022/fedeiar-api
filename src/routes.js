const pool = require('./databaseConnection.js')
const { Router } = require('express');
const router = Router();
const bodyParser = require("body-parser");
const dateTime = require('node-datetime');

router.use(bodyParser.json());

const user = require('./controllers/userController.js');
const game = require('./controllers/gameController.js');
const category = require('./controllers/categoryController.js');
const video = require('./controllers/videoController.js');

// ---------------------------------------------- INDEX  ----------------------------------------------

router.get('/', (request, response) => {
    response.send("Welcome to the API!");
});

// ---------------------------------------------- USERS ----------------------------------------------

router.get('/users', user.getUsers);
router.get('/users/:name', user.getUserByName);

// ---------------------------------------------- GAMES ----------------------------------------------

router.get('/games', game.getGames);
router.get('/games/:game_name', game.getGameByName);
router.post('/games', game.createGameWithCategories);
router.put('/games/:game_name', game.updateUser);
router.delete('/games/:game_name', game.deleteUser);

// ---------------------------------------------- CATEGORIES ----------------------------------------------

router.get('/games/:game_name/categories', category.getCategories);

// ---------------------------------------------- VIDEOS ----------------------------------------------

router.get('/videos', video.getVideos);

router.get('/videos/:id', video.getVideoById);

// esto es de videos o de juegos?
router.get('/games/:game_name/videos', video.getVideosOfGame);

router.get('/games/:game_name/:category_name/videos', video.getVideosOfGameAndCategory);


// EXPORTAR

module.exports = router;