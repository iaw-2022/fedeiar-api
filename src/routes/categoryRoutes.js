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


/**
 * @swagger
 * /category/{game_id}:
 *   post:
 *     summary: "Create a new category for a certain game"
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: game_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The game id"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: "Name of the category"
 *             example:
 *               category_name: "100%"
 *     responses:
 *       204:
 *         description: "Category successfully created"
 *       400:
 *         description: "Invalid ID, invalid JSON or category name already exists for the specified game"
 *       404:
 *         description: "Game doesn't exists"
 *       500:
 *         description: "Server error"
*/
router.post('/category/:game_id', category.addCategoryToGame);



/**
 * @swagger
 * /categories/{game_id}:
 *   put:
 *     summary: "Delete all existing categories for a game, and create new ones"
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: game_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The game id"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                   name: "category_name"
 *             example:
 *               categories: ["any%", "100%", "low%"]
 *     responses:
 *       204:
 *         description: "Categories successfully created"
 *       400:
 *         description: "Invalid ID, invalid JSON or category name already exists for the specified game"
 *       404:
 *         description: "Game doesn't exists"
 *       500:
 *         description: "Server error"
*/
router.put('/categories/:game_id', category.updateCategories);


// EXPORT

module.exports = router;