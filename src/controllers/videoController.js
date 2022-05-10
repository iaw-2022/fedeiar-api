const pool = require('../databaseConnection.js');
const dateTime = require('node-datetime');


const getVideos = async (request, response) => {
    try{
        let result = await pool.query("SELECT * FROM speedrun_videos");
        response.status(200).send(result.rows);
    } catch(error){
        response.status(500).send("Unknown server error.");
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
        response.status(200).send();
    } catch(error){
        response.status(400).send({"Error": "Error, please check that the user_id, the game_id and the category_id for that game already exists."});
    }
}

const updateVideo = async (request, response) => {
    let video_id = request.params.video_id;
    // TRATAR DE CONSTRUIR EL STRING QUERY A MANO ASI ME AHORRO ESTA CONSULTA.
    try{
        let videoResult = await pool.query(`SELECT * FROM speedrun_videos WHERE id=${video_id}`);
        if(videoResult.rowCount == 0){
            response.status(404).send(`Video with ID ${video_id} doesn't exists`);
            return;
        }
        var storedVideo = videoResult.rows[0];
    } catch(error){
        response.status(400).send("Please enter a valid video id");
    }

    const video = request.body;
    if(video.user_id) {storedVideo.user_id = video.user_id;}
    if(video.game_id) {storedVideo.game_id = video.game_id;}
    if(video.category_id) {storedVideo.category_id = video.category_id;}
    if(video.link) {storedVideo.link_video = video.link;}
    if(video.time) {storedVideo.completion_time_seconds = video.time;}

    currentDate = dateTime.create().format('Y-m-d H:M:S');
    try{
        let updateQuery = `UPDATE speedrun_videos SET user_id=${storedVideo.user_id}, game_id=${storedVideo.game_id}, category_id=${storedVideo.category_id}, link_video='${storedVideo.link_video}', completion_time_seconds='${storedVideo.completion_time_seconds}', updated_at='${currentDate}' WHERE id=${video_id}`;
        let result = await pool.query(updateQuery);
        if(result.rowCount == 0){
            response.status(404).send(`Video with ID ${video_id} doesn't exists`);
            return;
        }
        response.status(200).send(`Video with ID ${video_id} updated succesfully.`);
    } catch(error){
        response.status(404).send("Error, please check that the user_id, the game_id and the category_id for that game already exists.");
    }
}

const deleteVideo = async (request, response) => {
    let video_id = request.params.video_id;
    try{
        let deleteQuery = `DELETE FROM speedrun_videos WHERE id=${video_id}`;
        let result = await pool.query(deleteQuery);
        if(result.rowCount == 0){
            response.status(404).send(`Video with ID ${video_id} doesn't exists, nothing to delete`);
            return;
        }
        response.status(200).send(`Video with ID ${video_id} deleted succesfully.`); // como hago para devolver el juego insertado? mas que nada para mostrar el ID
    } catch(error){
        // puede haber algun error?
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