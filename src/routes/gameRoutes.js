const { Router } = require('express');
const router = Router();
const { swaggerUI, swaggerDocs } = require('../swagger.js');

const game = require('../controllers/gameController.js');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ---------------------------------------------- GAMES ROUTES ----------------------------------------------

router.get('/games', game.getGames);
router.get('/games/:game_id', game.getGameById);
router.post('/games', game.createGameWithCategories);
router.put('/games/:game_id', game.updateGame);
router.delete('/games/:game_id', game.deleteGame);


// EXPORT

module.exports = router;