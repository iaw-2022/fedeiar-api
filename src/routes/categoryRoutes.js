const { Router } = require('express');
const router = Router();

const category = require('../controllers/categoryController.js');


// ---------------------------------------------- CATEGORIES ROUTES ----------------------------------------------

// -------------------------------------------- SWAGGER CATEGORY SCHEMAS --------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the category"
 *         game_name:
 *           type: string
 *           description: "The game's name to which the category belongs to"
 *         category_name:
 *           type: string
 *           description: "Name of the category"
 *       example:
 *         id: "1"
 *         game_name: "Medievil"
 *         category_name: "any%"
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: The game's categories managing API.
 */

// -------------------------------------------- SWAGGER CATEGORY ROUTES --------------------------------------------

/**
 * @swagger
 * /categories/{game_id}:
 *   get:
 *     summary: "Get all the categories for the corresponding game"
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: game_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The game id"
 *     responses:
 *       200:
 *         description: "The list of the categories that belong to the game"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Category'
 *               example:
 *                 - id: "1"
 *                   game_name: "Medievil"
 *                   category_name: "any%"
 *                 - id: "2"
 *                   game_name: "Devil May Cry"
 *                   category_name: "low%" 
 *       400:
 *         description: "Invalid ID"
 *       404:
 *         description: "Game doesn't exists"
 *       500:
 *         description: "Server error"
 */
router.get('/categories/:game_id', category.getCategories);

// EXPORT

module.exports = router;