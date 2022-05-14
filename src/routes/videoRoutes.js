const { Router } = require('express');
const router = Router();
const { swaggerUI, swaggerDocs } = require('../swagger.js');

const video = require('../controllers/videoController.js');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ---------------------------------------------- VIDEOS ROUTES ----------------------------------------------

// -------------------------------------------- SWAGGER VIDEOS SCHEMAS --------------------------------------------

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - user_id
 *         - game_id
 *         - category_id
 *         - link_video
 *         - completion_time_seconds
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the video"
 *         user_id:
 *           type: string
 *           description: "The user's id to which the video belongs to"
 *         game_id:
 *           type: string
 *           description: "The game's id to which the video belongs to"
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
 *         user_id: "1"
 *         game_id: "1"
 *         category_id: "1"
 *         link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *         completion_time_seconds: 420
 *         created_at: "2022-05-12 03:53:45"
 *         updated_at: "2022-05-12 03:53:45"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     VideoArray:
 *       type: object
 *       required:
 *         - user_id
 *         - game_id
 *         - category_id
 *         - link_video
 *         - completion_time_seconds
 *       properties:
 *         id:
 *           type: string
 *           description: "The auto-generated id of the video"
 *         user_id:
 *           type: string
 *           description: "The user's id to which the video belongs to"
 *         game_id:
 *           type: string
 *           description: "The game's id to which the video belongs to"
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
 *         - id: "1"
 *           user_id: "1"
 *           game_id: "1"
 *           category_id: "1"
 *           link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *           completion_time_seconds: 420
 *           created_at: "2022-05-12 03:53:45"
 *           updated_at: "2022-05-12 03:53:45"
 *         - id: "2"
 *           user_id: "1"
 *           game_id: "1"
 *           category_id: "2"
 *           link_video: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *           completion_time_seconds: 420
 *           created_at: "2022-05-12 03:53:45"
 *           updated_at: "2022-05-12 03:53:45"
 * 
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
 *                 $ref: '#components/schemas/VideoArray'
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
 *     summary: "Get all the videos of a certain game"
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
 *                 $ref: '#components/schemas/VideoArray'
 *       400:
 *         description: "Invalid ID"
 *       500:
 *         description: "Server error"
*/
router.get('/videos/game/:game_id', video.getVideosOfGame);


/** 
 * @swagger
 * /videos/game/{game_id}:
 *   get:
 *     summary: "Get all the videos of a certain game"
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
 *                 $ref: '#components/schemas/VideoArray'
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
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: "id of the user who uploads the video"
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
 *               user_id: "1"
 *               game_id: "1"
 *               category_id: "1"
 *               link: "https://www.youtube.com/watch?v=j5j6l9ULxmI"
 *               time: 420
 *     responses:
 *       204:
 *         description: "Video successfully created"
 *       400:
 *         description: "non-existing IDs in JSON, invalid JSON or game name already exists"
 *       500:
 *         description: "Server error"
*/
router.post('/videos', video.createVideo);

/**
 * @swagger
 * /videos/{video_id}:
 *   put:
 *     summary: "Update the desired fields of an existing video, by id."
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
 *               user_id:
 *                 type: string
 *                 description: "id of the user who uploads the video"
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
 *               user_id: "1"
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
 *       500:
 *         description: "Server error"
*/
router.put('/videos/:video_id', video.updateVideo);


/** 
 * @swagger
 * /videos/{video_id}:
 *   delete:
 *     summary: "Remove video by id"
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
 *       500:
 *         description: "Server error"
*/
router.delete('/videos/:video_id', video.deleteVideo);

// EXPORT

module.exports = router;