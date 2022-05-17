const { Router } = require('express');
const router = Router();
const { swaggerUI, swaggerDocs } = require('../swagger.js');

const game = require('../controllers/gameController.js');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ---------------------------------------------- GAMES ROUTES ----------------------------------------------

// -------------------------------------------- SWAGGER GAME SCHEMAS --------------------------------------------

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
 *           id: "1"
 *           game_name: "Klonoa"
 *           created_at: "2022-05-12 03:53:45"
 *           updated_at: "2022-05-12 03:53:45"
 */



/**
 * @swagger
 * tags:
 *   name: Games
 *   description: The games managing API.
 */

// -------------------------------------------- SWAGGER GAME ROUTES --------------------------------------------

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
 *               type: array 
 *               items:
 *                 $ref: '#components/schemas/Game'
 *             example:
 *               - id: "1"
 *                 game_name: "Klonoa"
 *                 created_at: "2022-05-12 03:53:45"
 *                 updated_at: "2022-05-12 03:53:45"
 *               - id: "2"
 *                 game_name: "Dark Cloud"
 *                 created_at: "2022-05-12 03:53:45"
 *                 updated_at: "2022-05-12 03:53:45"
 *               
 */
router.get('/games', game.getGames);

/** 
 * @swagger
 * /games/{game_id}:
 *   get:
 *     summary: "Get game by id"
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: game_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The game id"
 *     responses:
 *       200:
 *         description: "The game description by id"
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#components/schemas/Game'
 *       404:
 *         description: "Game not found"
 *       400:
 *         description: "Invalid ID"
 *       500:
 *         description: "Server error"
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
 *             properties:
 *               game_name:
 *                 type: string
 *                 description: "Name of the game"
 *               categories:
 *                 type: array
 *                 description: "An array with all categories attached with the game"
 *                 items:
 *                   type: string
 *                   description: "Category Name"
 *             example:
 *               game_name: "Musashi"
 *               categories: ["any%", "100%"]
 *     responses:
 *       204:
 *         description: "Game successfully created"
 *       400:
 *         description: "Invalid ID, invalid JSON or game name already exists"
 *       500:
 *         description: "Server error"
*/
router.post('/games', game.createGameWithCategories);

/**
 * @swagger
 * /games/{game_id}:
 *  put:
 *    summary: "Update the game's name of an existing game, by id"
 *    tags: [Games]
 *    parameters:
 *      - in: path
 *        name: game_id
 *        schema:
 *          type: string
 *        required: true
 *        description: The game id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *               game_name:
 *                 type: string
 *                 description: "Name of the game"
 *             example:
 *               game_name: "updated_game_name"
 *    responses:
 *      204:
 *        description: "Game's name updated successfully"
 *      400:
 *        description: "Invalid ID, invalid JSON or game name already exists"
 *      404:
 *        description: "Game not found"
 *      500:
 *        description: "Server error"
 */
router.put('/games/:game_id', game.updateGame);

/** 
 * @swagger
 * /games/{game_id}:
 *   delete:
 *     summary: "Remove game by id"
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: game_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The game id"
 *     responses:
 *       204:
 *         description: "Game removed successfully"
 *       404:
 *         description: "Game not found"
 *       400:
 *         description: "Invalid ID"
 *       500:
 *         description: "Server error"
*/
router.delete('/games/:game_id', game.deleteGame);


// EXPORT

module.exports = router;