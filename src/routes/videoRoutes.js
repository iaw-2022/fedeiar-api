const { Router } = require('express');
const router = Router();
const { checkJwt } = require('../token.js');

const video = require('../controllers/videoController.js');


// ---------------------------------------------- VIDEOS ROUTES ----------------------------------------------

// -------------------------------------------- SWAGGER VIDEOS SCHEMAS --------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - id
 *         - user_name
 *         - user_id
 *         - game_name
 *         - game_id
 *         - category_name
 *         - category_id
 *         - link_video
 *         - completion_time_seconds
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the video"
 *         user_name:
 *           type: string
 *           description: "The user's name to which the video belongs to"
 *         user_id:
 *           type: string
 *           description: "The user's id to which the video belongs to"
 *         game_name:
 *           type: string
 *           description: "The game's name to which the video belongs to"
 *         game_id:
 *           type: string
 *           description: "The game's id to which the video belongs to"
 *         category_name:
 *           type: string
 *           description: "The category's name to which the video belongs to"
 *         category_id:
 *           type: string
 *           description: "The category's id to which the video belongs to"
 *         link_video:
 *           type: string
 *           description: "URL of the video"
 *         completion_time_seconds:
 *           type: string
 *           description: "The time taken to finish the game in the corresponding category"
 *         created_at:
 *           type: string
 *           description: "Category's auto-generated creation date"
 *         updated_at:
 *           type: string
 *           description: "Category's auto-generated last update date"
 *       example:
 *         id: "1"
 *         user_name: "pepe"
 *         user_id: "2"
 *         game_name: "Klonoa"
 *         game_id: "1"
 *         category_name: "any%"
 *         category_id: "1"
 *         link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *         completion_time_seconds: 420
 *         created_at: "2022-05-12 03:53:45"
 *         updated_at: "2022-05-12 03:53:45"
 */

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: The Video's managing API.
 */

// -------------------------------------------- SWAGGER VIDEOS ROUTES --------------------------------------------

/**
 * @swagger
 * /videos:
 *   get:
 *     summary: "Get all the videos"
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: "The list of all the videos"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   $ref: '#components/schemas/Video'
 *               example:
 *                 - id: "1"
 *                   user_name: "pepe"
 *                   user_id: "2"
 *                   game_name: "Klonoa"
 *                   game_id: "1"
 *                   category_name: "any%"
 *                   category_id: "1"
 *                   link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *                   completion_time_seconds: 420
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *                 - id: "2"
 *                   user_name: "pipa"
 *                   user_id: "2"
 *                   game_name: "Medievil"
 *                   game_id: "2"
 *                   category_name: "100%"
 *                   category_id: "2"
 *                   link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *                   completion_time_seconds: 420
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *       500:
 *         description: "Server error"
 */
router.get('/videos', video.getVideos);


/** 
 * @swagger
 * /videos/{video_id}:
 *   get:
 *     summary: "Get video by id"
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: video_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The video id"
 *     responses:
 *       200:
 *         description: "The video description by id"
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#components/schemas/Video'
 *       400:
 *         description: "Invalid ID"
 *       404:
 *         description: "Video not found"
 *       500:
 *         description: "Server error"
*/
router.get('/videos/:video_id', video.getVideoById);


/** 
 * @swagger
 * /videos/game/{game_id}:
 *   get:
 *     summary: "Get all the videos of a certain game by id"
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: game_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "A game id"
 *     responses:
 *       200:
 *         description: "The list of the videos that belongs to the game"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   $ref: '#components/schemas/Video'
 *               example:
 *                 - id: "1"
 *                   user_name: "pepe"
 *                   user_id: "2"
 *                   game_name: "Klonoa"
 *                   game_id: "1"
 *                   category_name: "any%"
 *                   category_id: "1"
 *                   link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *                   completion_time_seconds: 420
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *                 - id: "2"
 *                   user_name: "pipa"
 *                   user_id: "2"
 *                   game_name: "Medievil"
 *                   game_id: "2"
 *                   category_name: "100%"
 *                   category_id: "2"
 *                   link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *                   completion_time_seconds: 420
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *       400:
 *         description: "Invalid ID"
 *       500:
 *         description: "Server error"
*/
router.get('/videos/game/:game_id', video.getVideosOfGame);

/** 
 * @swagger
 * /videos/user/{user_id}:
 *   get:
 *     summary: "Get all the videos of a certain user by id"
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "A user id"
 *     responses:
 *       200:
 *         description: "The list of the videos that the user uploaded"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   $ref: '#components/schemas/Video'
 *               example:
 *                 - id: "1"
 *                   user_name: "pepe"
 *                   user_id: "2"
 *                   game_name: "Klonoa"
 *                   game_id: "1"
 *                   category_name: "any%"
 *                   category_id: "1"
 *                   link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *                   completion_time_seconds: 420
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *                 - id: "2"
 *                   user_name: "pipa"
 *                   user_id: "2"
 *                   game_name: "Medievil"
 *                   game_id: "2"
 *                   category_name: "100%"
 *                   category_id: "2"
 *                   link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *                   completion_time_seconds: 420
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *       400:
 *         description: "Invalid ID"
 *       500:
 *         description: "Server error"
*/
router.get('/videos/user/:user_id', video.getVideosOfUser);


/** 
 * @swagger
 * /videos/game/{game_id}/category/{category_id}:
 *   get:
 *     summary: "Get all the videos of a certain game and a certain category"
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: game_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The game id"
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The category id"
 *     responses:
 *       200:
 *         description: "The list of the videos that belongs to the game"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                   $ref: '#components/schemas/Video'
 *               example:
 *                 - id: "1"
 *                   user_name: "pepe"
 *                   user_id: "2"
 *                   game_name: "Klonoa"
 *                   game_id: "1"
 *                   category_name: "any%"
 *                   category_id: "1"
 *                   link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *                   completion_time_seconds: 420
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *                 - id: "2"
 *                   user_name: "pipa"
 *                   user_id: "2"
 *                   game_name: "Medievil"
 *                   game_id: "2"
 *                   category_name: "100%"
 *                   category_id: "2"
 *                   link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *                   completion_time_seconds: 420
 *                   created_at: "2022-05-12 03:53:45"
 *                   updated_at: "2022-05-12 03:53:45"
 *       400:
 *         description: "Invalid ID"
 *       500:
 *         description: "Server error"
*/
router.get('/videos/game/:game_id/category/:category_id', video.getVideosOfGameAndCategory);


/**
 * @swagger
 * /videos:
 *   post:
 *     summary: "Create a new video"
 *     security:
 *       - BearerAuth: []
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - game_id
 *               - category_id
 *               - link
 *               - time
 *             properties:
 *               game_id:
 *                 type: string
 *                 description: "id of the game which the video belongs to"
 *               category_id:
 *                 type: string
 *                 description: "id of the category which the video belongs to"
 *               link:
 *                 type: string
 *                 description: "URL of the video"
 *               time:
 *                 type: string
 *                 description: "The time (in seconds) taken to finish the game in the corresponding category"
 *             example:
 *               game_id: "1"
 *               category_id: "1"
 *               link: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *               time: 420
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
router.post('/videos', checkJwt, video.createVideo);

/**
 * @swagger
 * /videos/{video_id}:
 *   put:
 *     summary: "Update the desired fields of an existing video, by id."
 *     security:
 *       - BearerAuth: []
 *     description: "It's not obligatory to update all the fields, just the desired ones."
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: video_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The video id"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_id:
 *                 type: string
 *                 description: "id of the game which the video belongs to"
 *               category_id:
 *                 type: string
 *                 description: "id of the category which the video belongs to"
 *               link:
 *                 type: string
 *                 description: "URL of the video"
 *               time:
 *                 type: string
 *                 description: "The time (in seconds) taken to finish the game in the corresponding category"
 *             example:
 *               game_id: "1"
 *               category_id: "1"
 *               link: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *               time: 420
 *     responses:
 *       204:
 *         description: "Video successfully created"
 *       400:
 *         description: "non-existing IDs in JSON, invalid JSON or game name already exists"
 *       404:
 *         description: "Video not found"
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Server error"
*/
router.put('/videos/:video_id', checkJwt, video.updateVideo);


/** 
 * @swagger
 * /videos/{video_id}:
 *   delete:
 *     summary: "Remove video by id"
 *     security:
 *       - BearerAuth: []
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: video_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "The video id"
 *     responses:
 *       204:
 *         description: "Video removed successfully"
 *       404:
 *         description: "Video not found"
 *       400:
 *         description: "Invalid ID"
 *       401:
 *         description: "Unauthorized"
 *       500:
 *         description: "Server error"
*/
router.delete('/videos/:video_id', checkJwt, video.deleteVideo);

// EXPORT

module.exports = router;