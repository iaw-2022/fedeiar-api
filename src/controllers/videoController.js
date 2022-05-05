const pool = require('../databaseConnection.js');
const dateTime = require('node-datetime');


const getVideos = (request, response) => {
    pool.query("SELECT * FROM speedrun_videos", (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
}

const getVideoById = (request, response) => {
    pool.query("SELECT * FROM speedrun_videos WHERE id="+request.params.id, (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
}

const getVideosOfGame = (request, response) => {
    pool.query("SELECT * FROM games, speedrun_videos WHERE game_name='"+ request.params.game_name +"' AND games.id=speedrun_videos.game_id", (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
}

const getVideosOfGameAndCategory = (request, response) => {
    pool.query(`SELECT games.id AS game_id, categories.id AS category_id, game_name, category_name, speedrun_videos.id AS video_id FROM games, categories, speedrun_videos WHERE games.game_name='${request.params.game_name}' AND categories.category_name='${request.params.category_name}' AND games.id=speedrun_videos.game_id AND categories.id=speedrun_videos.category_id`, (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
}


module.exports = {
    getVideos,
    getVideoById,
    getVideosOfGame,
    getVideosOfGameAndCategory
}