const { Router } = require('express');
const router = Router();
const { swaggerUI, swaggerDocs } = require('../swagger.js');

const category = require('../controllers/categoryController.js');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// ---------------------------------------------- CATEGORIES ROUTES ----------------------------------------------

// -------------------------------------------- SWAGGER CATEGORY SCHEMAS --------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - game_id
 *         - category_name
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the category"
 *         game_id:
 *           type: string
 *           description: "The game's id to which the category belongs to"
 *         category_name:
 *           type: string
 *           description: "Name of the category"
 *         created_at:
 *           type: string
 *           description: "Category's auto-generated creation date"
 *         updated_at:
 *           type: string
 *           description: "Category's auto-generated last update date"
 *       example:
 *         id: "1"
 *         game_id: "1"
 *         category_name: "any%"
 *         created_at: "2022-05-12 03:53:45"
 *         updated_at: "2022-05-12 03:53:45"
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
 *                   game_id: "1"
 *                   category_name: "any%"
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *                 - id: "2"
 *                   game_id: "1"
 *                   category_name: "low%"
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45" 
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