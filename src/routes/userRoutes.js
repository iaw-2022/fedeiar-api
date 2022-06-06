const { Router } = require('express');
const router = Router();
const { checkJwt } = require('../token.js');

const user = require('../controllers/userController.js');


// ---------------------------------------------- USERS ROUTES ----------------------------------------------

// -------------------------------------------- SWAGGER USER SCHEMAS --------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - user_name
 *         - email
 *         - nationality
 *         - role
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the user"
 *         user_name:
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
 *         user_name: "bousher"
 *         email: "a_mail@mail.com"
 *         nationality: "Argentina"
 *         role: "administrator"
 *         created_at: "2022-05-12 03:53:45"
 *         updated_at: "2022-05-12 03:53:45"
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
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/User'
 *               example:
 *                 - id: "1"
 *                   user_name: "bousher"
 *                   email: "a_mail@mail.com"
 *                   nationality: "Argentina"
 *                   role: "administrator"
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *                 - id: "2"
 *                   user_name: "juan"
 *                   email: "a_mail2@mail.com"
 *                   nationality: "Argentina"
 *                   role: "administrator"
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
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

/** 
 * @swagger
 * /user_logged:
 *   get:
 *     summary: "Get the currently logged user in auth0"
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: "The user description"
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#components/schemas/User'
 *       401:
 *         description: "User must be logged in auth0"
 *       500:
 *         description: "Server error"
*/
router.get('/user_logged', checkJwt, user.getUserByEmail);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: "Create a new final user"
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - nationality
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: "user's username"
 *               nationality:
 *                 type: string
 *                 description: "user's nationality"
 *             example:
 *               user_name: "not_bousher"
 *               nationality: "Uruguay"
 *     responses:
 *       204:
 *         description: "Video successfully created"
 *       400:
 *         description: "non-existing IDs in JSON, invalid JSON or game name already exists"
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Server error"
*/
router.post('/users', checkJwt, user.createUser);

/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     summary: "Update the fields of the currently logged user in auth0."
 *     security:
 *       - BearerAuth: []
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: "the new user's name"
 *               nationality:
 *                 type: string
 *                 description: "the new user's origin country"
 *             example:
 *               user_name: "new_user_name"
 *               nationality: "Argentina"
 *     responses:
 *       204:
 *         description: "User successfully updated"
 *       400:
 *         description: "non-existing IDs in JSON, invalid JSON or user name already exists"
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Server error"
*/
router.put('/users/:user_id', checkJwt, user.updateUser);

// EXPORT

module.exports = router;