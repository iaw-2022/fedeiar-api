const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes.js');
const escape = require('pg-escape');

const getCategories = async (request, response) => {
    let game_name = request.params.game_name.toString();
    try{
        let getQuery = `SELECT categories.id, game_name, category_name, categories.created_at, categories.updated_at FROM categories, games WHERE games.id = game_id AND game_name=${escape.literal(game_name)}`;
        const result = await pool.query(getQuery);
        if(result.rowCount == 0){
            response.status(404).json({"message": `Game with name ${game_name} doesn't exists`, "code": 404});
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