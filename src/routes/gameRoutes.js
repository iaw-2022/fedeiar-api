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
 *       required:
 *         - id
 *         - game_name
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the game"
 *         game_name:
 *           type: string
 *           description: "Name of the game"
 *         image:
 *           type: string
 *           description: "The encoding of an image in base64"
 *         created_at:
 *           type: string
 *           description: "Game's auto-generated creation date"
 *         updated_at:
 *           type: string
 *           description: "Game's auto-generated last update date"
 *       example:
 *           id: "1"
 *           game_name: "Klonoa"
 *           image: <A large string>
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
 *                   image: <A large string>
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *                 - id: "2"
 *                   game_name: "Dark Cloud"
 *                   image: <A large string>
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

// TODO: borramos esta ruta?

/** 
 * @swagger
 * /games/image/{game_id}:
 *   get:
 *     summary: "Get game's image by id"
 *     description: "This route is NOT intended to be used in Swagger, it's just for documentation, since it's an image, it's just a huge string of hexadecimal characters."
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
 *                 type: object
 *                 properties:
 *                   image:
 *                     type: blob
 *                     example: "just a laaaarge hexadecimal string"
 *       404:
 *         description: "Game not found"
 *       400:
 *         description: "Invalid ID"
 *       500:
 *         description: "Server error"
*/
router.get('/games/image/:game_id', game.getGameImageById);


// EXPORT

module.exports = router;