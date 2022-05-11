const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes.js')

const getVideos = async (request, response) => {
    try{
        let result = await pool.query("SELECT * FROM speedrun_videos");
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"error": "Unknown server error.", "code": 500});
    }
}

const getVideoById = async (request, response) => {
    let video_id = request.params.video_id;
    try{
        result = await pool.query(`SELECT * FROM speedrun_videos WHERE id='${video_id}'`);
        response.status(200).json(result.rows);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const getVideosOfGame = async (request, response) => {
    try{
        let game_id = request.params.game_id;
        let getQuery = `SELECT * FROM speedrun_videos WHERE game_id='${game_id}'`;
        result = await pool.query(getQuery);
        response.status(200).json(result.rows);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const getVideosOfGameAndCategory = async (request, response) => {
    try{
        let game_id = request.params.game_id;
        let category_id = request.params.category_id;
        result = await pool.query(`SELECT * FROM speedrun_videos WHERE game_id='${game_id}' AND category_id='${category_id}'`);
        response.status(200).json(result.rows);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const createVideo = async (request, response) => {
    const video = request.body;
    if(!video.user_id || !video.game_id || !video.category_id || !video.link || !video.time){
        response.status(400).json({"error": "One of the following fields is missing: 'user_name', 'game_name' ,'category_name', 'link', 'time'", "code": 400});
        return;
    }
    
    currentDate = new Date().toISOString();
    console.log(currentDate);

    try{
        let insertVideoQuery = `INSERT INTO speedrun_videos(user_id, game_id, category_id, link_video, completion_time_seconds, created_at, updated_at) VALUES('${video.user_id}', '${video.game_id}', '${video.category_id}', '${video.link}', '${video.time}', '${currentDate}', '${currentDate}')`;
        await pool.query(insertVideoQuery);
        response.status(204).json();
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": "Error, check the syntax of the fields: id's and time must be numbers and link a string", "code": 400});
        } else if(errorCodes.missingKey(error)){
            response.status(400).json({"error": "Error, check that the user_id, the game_id and the category_id for that game exists.", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const updateVideo = async (request, response) => {
    let video_id = request.params.video_id;
    const video = request.body;
    currentDate = new Date().toISOString();

    let updateQuery = "UPDATE speedrun_videos SET ";

    if(video.user_id) {updateQuery += `user_id='${video.user_id}', `}
    if(video.game_id) {updateQuery += `game_id='${video.game_id}', `}
    if(video.category_id) {updateQuery += `category_id='${video.category_id}', `}
    if(video.link) {updateQuery += `link_video='${video.link}', `}
    if(video.time) {updateQuery += `completion_time_seconds='${video.time}', `}

    updateQuery += `updated_at='${currentDate}' WHERE id='${video_id}'`;

    try{
        let result = await pool.query(updateQuery);
        if(result.rowCount == 0){
            response.status(404).json({"error": `Video with ID ${video_id} doesn't exists`, "code": 404});
            return;
        }
        response.status(204).json();
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": "Error: ID must be number", "code": 400});
        } else if(errorCodes.missingKey(error)){
            response.status(400).json({"error": "error, check that the user_id, the game_id and the category_id for that game exists.", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const deleteVideo = async (request, response) => {
    let video_id = request.params.video_id;
    try{
        let deleteQuery = `DELETE FROM speedrun_videos WHERE id='${video_id}'`;
        let result = await pool.query(deleteQuery);
        if(result.rowCount == 0){
            response.status(404).json({"error": `Video with ID ${video_id} doesn't exists, nothing to delete`, "code": 404});
            return;
        }
        response.status(204).json();
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
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