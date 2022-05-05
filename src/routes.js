const pool = require('./databaseConnection.js')
const { Router } = require('express');
const router = Router();
const bodyParser = require("body-parser");
const dateTime = require('node-datetime');

router.use(bodyParser.json());

const user = require('./controllers/userController.js');
const game = require('./controllers/gameController.js');
const video = require('./controllers/videoController.js');

// ---------------------------------------------- INDEX  ----------------------------------------------

router.get('/', (request, response) => {
    //response.send([1, 2, 3]); // por que se ven feos los arreglos y los json?
    response.send("Welcome");
});

// ---------------------------------------------- USERS ----------------------------------------------

router.get('/users', user.getUsers);
router.get('/users/:name', user.getUserByName);

// ---------------------------------------------- GAMES ----------------------------------------------

router.get('/games', game.getGames);
router.get('/games/:game_name', game.getGameByName);
router.post('/games', game.createGame);
router.put('/games/:game_name', game.updateUser);
router.delete('/games/:game_name', game.deleteUser);

// ---------------------------------------------- CATEGORIES ----------------------------------------------

router.get('/games/:game_name/categories', (request, response) => {
    pool.query(`SELECT games.id, categories.id, game_name, category_name FROM games, categories WHERE games.game_name='${request.params.game_name}' AND games.id=categories.game_id`, (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
});


// ---------------------------------------------- VIDEOS ----------------------------------------------

router.get('/videos', video.getVideos);

router.get('/videos/:id', video.getVideoById);

// esto es de videos o de juegos?
router.get('/games/:game_name/videos', video.getVideosOfGame);

router.get('/games/:game_name/:category_name/videos', video.getVideosOfGameAndCategory);


// EXPORTAR

module.exports = router;