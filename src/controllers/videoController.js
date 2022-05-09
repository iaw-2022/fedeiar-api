const pool = require('../databaseConnection.js');
const dateTime = require('node-datetime');


const getVideos = async (request, response) => {
    try{
        let result = await pool.query("SELECT * FROM speedrun_videos");
        response.status(200).send(result.rows);
    } catch(error){
        // error?
    }
}

const getVideoById = async (request, response) => {
    try{
        result = await pool.query("SELECT * FROM speedrun_videos WHERE id="+request.params.id);
        response.status(200).send(result.rows);
    } catch(error){
        response.status(400).send("Please enter a valid video id");
    }
}

const getVideosOfGame = async (request, response) => {
    try{
        result = await pool.query("SELECT * FROM games, speedrun_videos WHERE game_name='"+ request.params.game_name +"' AND games.id=speedrun_videos.game_id");
        response.status(200).send(result.rows);
    } catch(error){
        response.status(400).send("Please enter a valid game name");
    }
}

const getVideosOfGameAndCategory = async (request, response) => {
    try{
        result = await pool.query(`SELECT speedrun_videos.id AS video_id, games.id AS game_id, categories.id AS category_id, game_name, category_name FROM games, categories, speedrun_videos WHERE games.game_name='${request.params.game_name}' AND categories.category_name='${request.params.category_name}' AND games.id=speedrun_videos.game_id AND categories.id=speedrun_videos.category_id`);
        response.status(200).send(result.rows);
    } catch(error){
        response.status(400).send("Please enter a valid game name and category name");
    }
}


module.exports = {
    getVideos,
    getVideoById,
    getVideosOfGame,
    getVideosOfGameAndCategory
}