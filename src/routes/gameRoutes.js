const { Router } = require('express');
const router = Router();

const game = require('../controllers/gameController.js');


// ---------------------------------------------- GAMES ROUTES ----------------------------------------------

// -------------------------------------------- SWAGGER GAME SCHEMAS --------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
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
 *               example:
 *                 - id: "1"
 *                   game_name: "Klonoa"
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *                 - id: "2"
 *                   game_name: "Dark Cloud"
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
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


// EXPORT

module.exports = router;