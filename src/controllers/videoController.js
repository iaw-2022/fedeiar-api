const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes.js')
const escape = require('pg-escape');

const getVideos = async (request, response) => {
    try{
        let getQuery = "SELECT videos.id, user_name, user_id, game_name, games.id AS game_id, category_name, categories.id AS category_id,link_video, completion_time_seconds, videos.created_at, videos.updated_at FROM speedrun_videos AS videos, categories, games, users WHERE videos.user_id = users.id AND videos.game_id = games.id AND videos.category_id = categories.id"
        let result = await pool.query(getQuery);
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"message": "Unknown server error.", "code": 500});
    }
}

const getVideoById = async (request, response) => {
    let video_id = request.params.video_id.toString();
    try{
        let getQuery = `SELECT videos.id, user_name, user_id, game_name, games.id AS game_id, category_name, categories.id AS category_id,link_video, completion_time_seconds, videos.created_at, videos.updated_at FROM speedrun_videos AS videos, categories, games, users WHERE videos.id=${escape.literal(video_id)} AND videos.user_id = users.id AND videos.game_id = games.id AND videos.category_id = categories.id`;
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
        let getQuery = `SELECT videos.id, user_name, user_id, game_name, games.id AS game_id, category_name, categories.id AS category_id,link_video, completion_time_seconds, videos.created_at, videos.updated_at FROM speedrun_videos AS videos, categories, games, users WHERE games.id=${escape.literal(game_id)} AND videos.user_id = users.id AND videos.game_id = games.id AND videos.category_id = categories.id`;
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

const getVideosOfUser = async (request, response) => {
    try{
        let user_id = request.params.user_id.toString();
        let getQuery = `SELECT videos.id, user_name, user_id, game_name, games.id AS game_id, category_name, categories.id AS category_id,link_video, completion_time_seconds, videos.created_at, videos.updated_at FROM speedrun_videos AS videos, categories, games, users WHERE users.id=${escape.literal(user_id)} AND videos.user_id = users.id AND videos.game_id = games.id AND videos.category_id = categories.id`;
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
        let getQuery = `SELECT videos.id, user_name, user_id, game_name, games.id AS game_id, category_name, categories.id AS category_id,link_video, completion_time_seconds, videos.created_at, videos.updated_at FROM speedrun_videos AS videos, categories, games, users WHERE games.id=${escape.literal(game_id)} AND categories.id=${escape.literal(category_id)} AND videos.user_id = users.id AND videos.game_id = games.id AND videos.category_id = categories.id`;
        const result = await pool.query(getQuery);
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
    const email = request.auth.payload['https://example.com/email'];
    let video = request.body;
    video.user_id = 1; // Usamos un usuario por defecto en caso de que estemos usando la API para probar la ruta.
    
    if(email != null){
        try{
            const getUserQuery = `SELECT * FROM users WHERE email=${escape.literal(email)}`
            let result = await pool.query(getUserQuery);
            result = result.rows[0];
            video.user_id = result.id;
        }catch(error){
            response.status(500).json({"message": "Unknown server error.", "code": 500});
            return;
        }
    }
    
    if(!video.game_id || !video.category_id || !video.link || !video.time){
        response.status(400).json({"message": "One of the following fields is missing: 'game_id' ,'category_id', 'link', 'time'", "code": 400});
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
    const email = request.auth.payload['https://example.com/email'];
    let video = request.body;
    let video_id = request.params.video_id.toString();
    video.user_id = 1; // Usamos un usuario por defecto en caso de que estemos usando la API para probar la ruta.
    
    if(!(await existsVideo(response, video_id))){
        return;
    }

    if(email != null){
        if(!(await videoBelongsToUser(response, email, video_id))){
            return;
        }
    }
    
    currentDate = new Date().toISOString();

    let updateQuery = "UPDATE speedrun_videos SET ";

    if(video.game_id) {updateQuery += `game_id=${escape.literal(video.game_id.toString())}, `}
    if(video.category_id) {updateQuery += `category_id=${escape.literal(video.category_id.toString())}, `}
    if(video.link) {updateQuery += `link_video=${escape.literal(video.link.toString())}, `}
    if(video.time) {updateQuery += `completion_time_seconds=${escape.literal(video.time.toString())}, `}

    updateQuery += `updated_at='${currentDate}' WHERE id=${escape.literal(video_id)}`;

    try{
        await pool.query(updateQuery);
        response.status(204).json();
    } catch(error){
        if(errorCodes.missingKey(error)){
            response.status(400).json({"message": "error, check that the game_id and the category_id for that game exists.", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

async function existsVideo(response, video_id){
    try{
        const getVideoQuery = `SELECT * FROM speedrun_videos WHERE id=${escape.literal(video_id)}`
        let result = await pool.query(getVideoQuery);
        if(result.rowCount == 0){
            response.status(404).json({"message": `Video with ID ${video_id} doesn't exists`, "code": 404});
            return false;
        }
        return true;
    }catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": "Error: ID must be number", "code": 400});
        }else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
        return false;;
    }
}

async function videoBelongsToUser(response, email, video_id){
    try{
        const getVideoQuery = `SELECT * FROM users INNER JOIN speedrun_videos AS videos ON users.id = videos.user_id WHERE users.email=${escape.literal(email)} AND videos.id=${escape.literal(video_id)}`
        let result = await pool.query(getVideoQuery);
        if(result.rowCount == 0){
            response.status(401).json({"message": `Unauthorized: you can't edit or delete other user's videos.`, "code": 401});
            return false;
        }
        return true;
    }catch(error){
        response.status(500).json({"message": "Unknown server error.", "code": 500});
        return false;
    }
}

const deleteVideo = async (request, response) => {
    const video_id = request.params.video_id.toString();
    const email = request.auth.payload['https://example.com/email'];

    if(!(await existsVideo(response, video_id))){
        return;
    }

    if(email != null){
        if(!(await videoBelongsToUser(response, email, video_id))){
            return;
        }
    }

    try{
        const deleteQuery = `DELETE FROM speedrun_videos WHERE id=${escape.literal(video_id)}`;
        const result = await pool.query(deleteQuery);
        response.status(204).json();
    } catch(error){
        response.status(500).json({"message": "Unknown server error.", "code": 500});
    }
}

module.exports = {
    getVideos,
    getVideoById,
    getVideosOfGame,
    getVideosOfUser,
    getVideosOfGameAndCategory,
    createVideo,
    updateVideo,
    deleteVideo
}