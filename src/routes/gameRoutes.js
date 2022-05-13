const { Router } = require('express');
const router = Router();
const { swaggerUI, swaggerDocs } = require('../swagger.js');

const game = require('../controllers/gameController.js');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ---------------------------------------------- GAMES ROUTES ----------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - game_name
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the game"
 *         game_name:
 *           type: string
 *           description: "Name of the game"
 *         created_at:
 *           type: string
 *           description: "Game's auto-generated creation date"
 *         updated_at:
 *           type: string
 *           description: "Game's auto-generated last update date"
 *       example:
 *         id: "1"
 *         name: "Klonoa"
 *         created_at: "2022-05-12 03:53:45"
 *         updated_at: "2022-05-12 03:53:45"
 */

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: The games managing API.
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: "Get all games"
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: "The list of all games"
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#components/schemas/Game'
 */
router.get('/games', game.getGames);

/** 
 * @swagger
 * /game/{game_id}:
 *   get:
 *     summary: "Get game by id"
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The user id"
 *     responses:
 *       200:
 *         description: "The user description by id"
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#components/schemas/Game'
 *       404:
 *         description: "Game not found"
 *       400:
 *         description: "Invalid id type"
*/
router.get('/games/:game_id', game.getGameById);


/**
 * @swagger
 * /games:
 *   post:
 *     summary: "Create a new game with it's categories"
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - game_name
 *               - categories
 *             properties:
 *               game_name:
 *                 type: string
 *                 description: "Name of the game"
 *               categories:
 *                 type: list
 *                 description: "An array with all categories attached with the game"
 *             example:
 *               game_name: "Musashi"
 *               categories: ["any%", "100%"]
 *     responses:
 *       204:
 *         description: "Game successfully created"
 *       400:
 *         description: "Bad syntax or Game already exists"
*/
router.post('/games', game.createGameWithCategories);

//CONTINUAR ACA CON EL SWAGGER PUT
router.put('/games/:game_id', game.updateGame);


router.delete('/games/:game_id', game.deleteGame);


// EXPORT

module.exports = router;