const { Router } = require('express');
const router = Router();
const { swaggerUI, swaggerDocs } = require('../swagger.js');

const user = require('../controllers/userController.js');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ---------------------------------------------- USERS ROUTES ----------------------------------------------

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
 *           type: integer
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: user's username
 *         email:
 *           email: string
 *           description: user's email
 *          nationality:
 *            type: string
 *            description: user's nationality
 *          role:
 *            type: string
 *            description: user's permission role
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: API for seeing all information related to users.
  */

/**
 * @swagger
 * 
 * 
 * /users:
 *   get:
 *     tags: 
 *     - "Users"
 *     summary: "Get all users"
 *     description: ""
 *     responses:
 *       200:
 *         description: Success
 * 
 */
 router.get('/users', user.getUsers);

 router.get('/users/:user_id', user.getUserById);



 // EXPORT

 module.exports = router;