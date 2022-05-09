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

const createVideo = async (request, response) => {
    const video = request.body;
    if(!video.user_id || !video.game_id || !video.category_id || !video.link || !video.time){
        response.status(400).send("One of the following fields is missing: 'user_name', 'game_name' ,'category_name', 'link', 'time'");
    }

    currentDate = dateTime.create().format('Y-m-d H:M:S');
    try{
        let insertVideoQuery = `INSERT INTO speedrun_videos(user_id, game_id, category_id, link_video, completion_time_seconds, created_at, updated_at) VALUES(${video.user_id}, ${video.game_id}, ${video.category_id}, '${video.link}', '${video.time}', '${currentDate}', '${currentDate}')`;
        await pool.query(insertVideoQuery);
        response.status(200).send("Video created succesfully");
    } catch(error){
        response.status(404).send("Error, please check that the user_id, the game_id and the category_id for that game already exists.");
    }
}
/*
async function getUserId(username){
    try{
        let getUserIdQuery = `SELECT id FROM users WHERE name='${username}'`;
        let resultUserId = await pool.query(getUserIdQuery);
        let user_id = resultUserId.rows[0].id;
        return user_id;
    } catch(error){
        return false;
    }
}

async function getGameId(gameName){
    try{
        let getGameIdQuery = `SELECT id FROM games WHERE game_name='${gameName}'`;
        let resultGameId = await pool.query(getGameIdQuery);
        let game_id = resultGameId.rows[0].id;
        return game_id;
    } catch(error){
        return false;
    }
}

async function getCategoryId(game_id, categoryName){
    try{
        let getCategoryIdQuery = `SELECT id FROM categories WHERE game_id=${game_id} AND category_name='${categoryName}'`;
        let resultCategoryId = await pool.query(getCategoryIdQuery);
        let category_id = resultCategoryId.rows[0].id;
        return category_id;
    } catch(error){
        return false;
    }
}
*/

const updateVideo = async (request, response) => {
    const video = request.body;
    try{
        let video_id = request.params.video_id;
        let videoResult = await pool.query(`SELECT * FROM speedrun_videos WHERE id=${video_id}`);
        if(videoResult.rowCount == 0){
            response.status(404).send(`Video with ID ${video_id} doesn't exists`);
            return;
        }
        var storedVideo = videoResult.rows[0];
    } catch(error){
        response.status(400).send("Please enter a valid video id");
    }

    // SEGUIR: VER QUE CAMPOS COMPLETO EL USUARIO, Y REEMPLAZAR EN storedVideo LOS CAMPOS NO NULOS, Y DESPUÉS GUARDAR ESO.
}

const deleteVideo = async (request, response) => {
    
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