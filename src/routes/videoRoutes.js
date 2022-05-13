const { Router } = require('express');
const router = Router();
const { swaggerUI, swaggerDocs } = require('../swagger.js');

const video = require('../controllers/videoController.js');

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// ---------------------------------------------- VIDEOS ROUTES ----------------------------------------------

router.get('/videos', video.getVideos);
router.get('/videos/:video_id', video.getVideoById);
// los siguientes 2 son de videos o de juegos?
router.get('/games/:game_id/videos', video.getVideosOfGame);
router.get('/games/:game_id/:category_id/videos', video.getVideosOfGameAndCategory);
router.post('/videos', video.createVideo);
router.put('/videos/:video_id', video.updateVideo);
router.delete('/videos/:video_id', video.deleteVideo);

// EXPORT

module.exports = router;