const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes.js');
const escape = require('pg-escape');

const getCategories = async (request, response) => {
    let game_id = request.params.game_id.toString();
    try{
        let getQuery = `SELECT categories.id, game_name, category_name FROM categories, games WHERE game_id=${escape.literal(game_id)} AND game_id = games.id`;
        const result = await pool.query(getQuery);
        if(result.rowCount == 0){
            response.status(404).json({"message": `Game with ID ${game_id} doesn't exists`, "code": 404});
            return;
        }
        response.status(200).json(result.rows);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

module.exports = {
    getCategories,
}