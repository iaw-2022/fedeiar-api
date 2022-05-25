const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes.js')
const escape = require('pg-escape');

const getVideos = async (request, response) => {
    try{
        let result = await pool.query("SELECT videos.id, games.id AS game_id, user_name, game_name, category_name, link_video, completion_time_seconds, videos.created_at, videos.updated_at FROM speedrun_videos AS videos, categories, games, users WHERE videos.user_id = users.id AND videos.game_id = games.id AND videos.category_id = categories.id");
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"message": "Unknown server error.", "code": 500});
    }
}

const getVideoById = async (request, response) => {
    let video_id = request.params.video_id.toString();
    try{
        let getQuery = `SELECT videos.id, games.id AS game_id, user_name, game_name, category_name, link_video, completion_time_seconds, videos.created_at, videos.updated_at FROM speedrun_videos AS videos, categories, games, users WHERE videos.id=${escape.literal(video_id)} AND videos.user_id = users.id AND videos.game_id = games.id AND videos.category_id = categories.id`;
        let result = await pool.query(getQuery);
        if(result.rowCount == 0){
            response.status(404).json({"message": `Video with ID ${video_id} doesn't exists`, "code": 404});
            return;
        }
        response.status(200).json(result.rows[0]);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

const getVideosOfGame = async (request, response) => {
    try{
        let game_id = request.params.game_id.toString();
        let getQuery = `SELECT videos.id, games.id AS game_id, user_name, game_name, category_name, link_video, completion_time_seconds, videos.created_at, videos.updated_at FROM speedrun_videos AS videos, categories, games, users WHERE games.id=${escape.literal(game_id)} AND videos.user_id = users.id AND videos.game_id = games.id AND videos.category_id = categories.id`;
        let result = await pool.query(getQuery);
        response.status(200).json(result.rows);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

const getVideosOfGameAndCategory = async (request, response) => {
    try{
        let game_id = request.params.game_id.toString();
        let category_id = request.params.category_id.toString();
        let getQuery = `SELECT videos.id, games.id AS game_id, user_name, game_name, category_name, link_video, completion_time_seconds, videos.created_at, videos.updated_at FROM speedrun_videos AS videos, categories, games, users WHERE games.id=${escape.literal(game_id)} AND categories.id=${escape.literal(category_id)} AND videos.user_id = users.id AND videos.game_id = games.id AND videos.category_id = categories.id`;
        result = await pool.query(getQuery);
        response.status(200).json(result.rows);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

const createVideo = async (request, response) => {
    const video = request.body;
    if(!video.user_id || !video.game_id || !video.category_id || !video.link || !video.time){
        response.status(400).json({"message": "One of the following fields is missing: 'user_id', 'game_id' ,'category_id', 'link', 'time'", "code": 400});
        return;
    }
    let user_id = video.user_id.toString(), game_id = video.game_id.toString(), category_id = video.category_id.toString(), link = video.link.toString(), time = video.time.toString();
    currentDate = new Date().toISOString();

    try{
        let insertVideoQuery = `INSERT INTO speedrun_videos(user_id, game_id, category_id, link_video, completion_time_seconds, created_at, updated_at) VALUES(${escape.literal(user_id)}, ${escape.literal(game_id)}, ${escape.literal(category_id)}, ${escape.literal(link)}, ${escape.literal(time)}, '${currentDate}', '${currentDate}')`;
        await pool.query(insertVideoQuery);
        response.status(204).json();
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": "Error, check the syntax of the fields: id's and time must be numbers and link a string", "code": 400});
        } else if(errorCodes.missingKey(error)){
            response.status(400).json({"message": "Error, check that the user_id, the game_id and the category_id for that game exists.", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

const updateVideo = async (request, response) => {
    let video_id = request.params.video_id.toString();
    const video = request.body;
    currentDate = new Date().toISOString();

    let updateQuery = "UPDATE speedrun_videos SET ";

    if(video.user_id) {updateQuery += `user_id=${escape.literal(video.user_id.toString())}, `}
    if(video.game_id) {updateQuery += `game_id=${escape.literal(video.game_id.toString())}, `}
    if(video.category_id) {updateQuery += `category_id=${escape.literal(video.category_id.toString())}, `}
    if(video.link) {updateQuery += `link_video=${escape.literal(video.link.toString())}, `}
    if(video.time) {updateQuery += `completion_time_seconds=${escape.literal(video.time.toString())}, `}

    updateQuery += `updated_at='${currentDate}' WHERE id=${escape.literal(video_id)}`;

    try{
        let result = await pool.query(updateQuery);
        if(result.rowCount == 0){
            response.status(404).json({"message": `Video with ID ${video_id} doesn't exists`, "code": 404});
            return;
        }
        response.status(204).json();
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": "Error: ID must be number", "code": 400});
        } else if(errorCodes.missingKey(error)){
            response.status(400).json({"message": "error, check that the user_id, the game_id and the category_id for that game exists.", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

const deleteVideo = async (request, response) => {
    let video_id = request.params.video_id.toString();
    try{
        let deleteQuery = `DELETE FROM speedrun_videos WHERE id=${escape.literal(video_id)}`;
        let result = await pool.query(deleteQuery);
        if(result.rowCount == 0){
            response.status(404).json({"message": `Video with ID ${video_id} doesn't exists, nothing to delete`, "code": 404});
            return;
        }
        response.status(204).json();
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

module.exports = {
    getVideos,
    getVideoById,
    getVideosOfGame,
    getVideosOfGameAndCategory,
    createVideo,
    updateVideo,
    deleteVideo
}