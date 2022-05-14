const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes');
const escape = require('pg-escape');

const getGames = async (request, response) => {
    try{
        let result = await pool.query("SELECT * FROM games");
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"error": "Unknown server error.", "code": 500});
    }
}

const getGameById = async (request, response) => {
    let game_id = request.params.game_id.toString();
    try{
        const getQuery = `SELECT * FROM games WHERE id=${escape.literal(game_id)}`;
        let result = await pool.query(getQuery);
        if(result.rowCount == 0){
            response.status(404).json({"error": `Game with ID ${game_id} doesn't exists`, "code": 404});
            return;
        }
        response.status(200).json(result.rows[0]);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": `Error: ID must be number`, "code": 400});
        }else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const createGameWithCategories = async (request, response) => {
    let game_name = request.body.game_name;
    let categories = request.body.categories;
    if(!game_name){
        response.status(400).json({"error": "'game_name' field is required.", "code": 500});
        return;
    }
    if(!categories || !Array.isArray(categories) || categories.length == 0){
        response.status(400).json({"error": "'categories' array field is required and is must not be an empty array", code: 400});
        return;
    }
    game_name = game_name.toString();
    for(let i = 0; i < categories.length; i++){
        categories[i] = categories[i].toString();
    }
    categories = [...new Set(categories)]; // Elimina categorias duplicadas
    currentDate = new Date().toISOString();

    try{
        let insertGameQuery = `INSERT INTO games(game_name, created_at, updated_at) VALUES(${escape.literal(game_name)}, '${currentDate}', '${currentDate}')`;
        await pool.query(insertGameQuery);
    } catch(error){
        if(errorCodes.duplicatedKey(error)){
            response.status(400).json({"error": "Game already exists. Please use another name", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
        return;
    }
    try{
        let resultGame = await pool.query(`SELECT * FROM games WHERE game_name=${escape.literal(game_name)}`);
        let game_id = resultGame.rows[0].id.toString();
        for(let categoryName of categories){
            let insertCategoryQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES(${escape.literal(game_id)}, ${escape.literal(categoryName)}, '${currentDate}', '${currentDate}')`;
            await pool.query(insertCategoryQuery);
        }
        response.status(204).json();
    } catch(error){
        response.status(500).json({"error": "Unknown server error.", "code": 500});
    }
}

const updateGame = async (request, response) => {
    let game_id = request.params.game_id.toString();
    let game_name = request.body.game_name;
    if(!game_name){
        response.status(400).json({"error": "'game_name' field is required.", "code": 400});
        return;
    }
    game_name = game_name.toString();
    currentDate = new Date().toISOString();

    try{
        let updateQuery = `UPDATE games SET game_name=${escape.literal(game_name)}, updated_at='${currentDate}' WHERE id=${escape.literal(game_id)}`;
        let result = await pool.query(updateQuery);
        if(result.rowCount == 0){
            response.status(404).json({"error": `Game with ID ${game_id} doesn't exists`, "code": 404});
            return;
        }
        response.status(204).json();
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": `Error: ID must be number`, "code": 400});
        } else if(errorCodes.duplicatedKey(error)){
            response.status(400).json({"error": "Game already exists. Use another name", "code": 400}); 
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const deleteGame = async (request, response) => {
    let game_id = request.params.game_id.toString();
    try{
        let deleteQuery = `DELETE FROM games WHERE id=${escape.literal(game_id)}`;
        let result = await pool.query(deleteQuery);
        if(result.rowCount == 0){
            response.status(404).json({"error": `Game with ID ${game_id} doesn't exists`, "code": 404})
            return;
        }
        response.status(204).json();
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": `Error: ID must be number`, "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

module.exports = {
    getGames,
    getGameById,
    createGameWithCategories,
    updateGame,
    deleteGame
}