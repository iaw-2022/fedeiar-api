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
router.get('/users/:user_id', user.getUserById);

// ---------------------------------------------- GAMES ----------------------------------------------

router.get('/games', game.getGames);
router.get('/games/:game_id', game.getGameById);
router.post('/games', game.createGameWithCategories);
router.put('/games/:game_id', game.updateGame);
router.delete('/games/:game_id', game.deleteGame);

// ---------------------------------------------- CATEGORIES ----------------------------------------------

router.get('/games/:game_id/categories', category.getCategories);
router.post('/games/:game_id/category', category.addCategoryToGame);
router.put('/games/:game_id/categories', category.updateCategories);

// ---------------------------------------------- VIDEOS ----------------------------------------------

router.get('/videos', video.getVideos);
router.get('/videos/:video_id', video.getVideoById);
// los siguientes 2 son de videos o de juegos?
router.get('/games/:game_id/videos', video.getVideosOfGame);
router.get('/games/:game_id/:category_id/videos', video.getVideosOfGameAndCategory);
router.post('/videos', video.createVideo);
router.put('/videos/:video_id', video.updateVideo);
router.delete('/videos/:video_id', video.deleteVideo);


// EXPORTAR

module.exports = router;