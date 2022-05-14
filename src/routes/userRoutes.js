const { Router } = require('express');
const router = Router();
const { swaggerUI, swaggerDocs } = require('../swagger.js');

const user = require('../controllers/userController.js');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ---------------------------------------------- USERS ROUTES ----------------------------------------------

// -------------------------------------------- SWAGGER USER SCHEMAS --------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - nationality
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the user"
 *         name:
 *           type: string
 *           description: "user's username"
 *         email:
 *           type: string
 *           description: "user's email"
 *         nationality:
 *           type: string
 *           description: "user's nationality"
 *         role:
 *           type: string
 *           description: "user's permission role"
 *         created_at:
 *           type: string
 *           description: "user's auto-generated creation date"
 *         updated_at:
 *           type: string
 *           description: "user's auto-generated last update date"
 *       example:
 *         id: "1"
 *         name: "bousher"
 *         email: "a_mail@mail.com"
 *         nationality: "Argentina"
 *         role: "administrator"
 *         created_at: "2022-05-12 03:53:45"
 *         updated_at: "2022-05-12 03:53:45"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserArray:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - nationality
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the user"
 *         name:
 *           type: string
 *           description: "user's username"
 *         email:
 *           type: string
 *           description: "user's email"
 *         nationality:
 *           type: string
 *           description: "user's nationality"
 *         role:
 *           type: string
 *           description: "user's permission role"
 *         created_at:
 *           type: string
 *           description: "user's auto-generated creation date"
 *         updated_at:
 *           type: string
 *           description: "user's auto-generated last update date"
 *       example:
 *         - id: "1"
 *           name: "bousher"
 *           email: "a_mail@mail.com"
 *           nationality: "Argentina"
 *           role: "administrator"
 *           created_at: "2022-05-12 03:53:45"
 *           updated_at: "2022-05-12 03:53:45"
 *         - id: "2"
 *           name: "juan"
 *           email: "a_mail2@mail.com"
 *           nationality: "Argentina"
 *           role: "administrator"
 *           created_at: "2022-05-12 03:53:45"
 *           updated_at: "2022-05-12 03:53:45"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for seeing all information related to users.
 */

// -------------------------------------------- SWAGGER USER ROUTES --------------------------------------------

/**
 * @swagger
 * /users:
 *   get:
 *     summary: "Get all users"
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: "The list of all users"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/UserArray'
 *       500:
 *         description: "Server error"
 */
router.get('/users', user.getUsers);

/** 
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: "Get user by id"
 *     tags: [Users]
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
 *                 $ref: '#components/schemas/User'
 *       404:
 *         description: "User not found"
 *       400:
 *         description: "Invalid ID"
 *       500:
 *         description: "Server error"
*/
router.get('/users/:user_id', user.getUserById);



// EXPORT

module.exports = router;