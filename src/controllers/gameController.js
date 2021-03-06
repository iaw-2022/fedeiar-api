const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes');
const escape = require('pg-escape');

const getGames = async (request, response) => {
    try{
        let result = await pool.query("SELECT id, game_name, created_at, updated_at FROM games");
        for(let row of result.rows){
            row.image_URL = `/games/image/${row.id}`
        }
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"message": "Unknown server error.", "code": 500});
    }
}

const getGameById = async (request, response) => {
    let game_id = request.params.game_id.toString();
    try{
        const getQuery = `SELECT id, game_name, created_at, updated_at FROM games WHERE id=${escape.literal(game_id)}`;
        let result = await pool.query(getQuery);
        if(result.rowCount == 0){
            response.status(404).json({"message": `Game with ID ${game_id} doesn't exists`, "code": 404});
            return;
        }
        row = result.rows[0];
        row.image_URL = `/games/image/${game_id}`
        response.status(200).json(row);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": `Error: ID must be number`, "code": 400});
        }else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

const getGameImageById = async (request, response) => {
    let game_id = request.params.game_id.toString();
    try{
        const getQuery = `SELECT id, image FROM games WHERE id=${escape.literal(game_id)}`;
        let result = await pool.query(getQuery);
        if(result.rowCount == 0){
            response.status(404).json({"message": `Game with ID ${game_id} doesn't exists`, "code": 404});
            return;
        }
        let game = result.rows[0];
        const fs = require('fs');
        const path = require('path');
        fs.writeFileSync("public/"+game.id+".jpg", game.image.toString(), "base64");
        let image_path = path.join(__dirname, `../../public/${game.id}.jpg`);
        response.status(200).sendFile(image_path);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": `Error: ID must be number`, "code": 400});
        }else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

module.exports = {
    getGames,
    getGameById,
    getGameImageById,
}