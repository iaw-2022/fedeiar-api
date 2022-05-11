const pool = require('../databaseConnection.js');
const codeErrors = require('../errorCodes');

const getGames = async (request, response) => {
    try{
        let result = await pool.query("SELECT * FROM games");
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"error": "Unknown server error.", "code": 500});
    }
}

const getGameById = async (request, response) => {
    let game_id = request.params.game_id;
    try{
        result = await pool.query(`SELECT * FROM games WHERE id='${game_id}'`);
        response.status(200).json(result.rows);
    } catch(error){
        console.log(error);
        if(codeErrors.invalidType(error)){
            response.status(400).json({"error": `Error: ID must be number`, "code": 400});
        }else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const createGameWithCategories = async (request, response) => {
    const game = request.body;
    if(!game.game_name){
        response.status(400).json({"error": "'game_name' field is required.", "code": 500});
        return;
    }
    if(!game.categories || !Array.isArray(game.categories) || game.categories.length == 0){
        response.status(400).json({"error": "'categories' array field is required and is must not be an empty array", code: 400});
        return;
    }
    game.categories = [...new Set(game.categories)]; // Elimina categorias duplicadas
    
    currentDate = new Date().toISOString();
    try{
        let insertGameQuery = `INSERT INTO games(game_name, created_at, updated_at) VALUES('${game.game_name}', '${currentDate}', '${currentDate}')`;
        const result = await pool.query(insertGameQuery);
    } catch(error){
        if(codeErrors.duplicatedKey(error)){
            response.status(400).json({"error": "Game already exists. Please use another name", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
        return;
    }

    try{
        let resultGame = await pool.query(`SELECT * FROM games WHERE game_name='${game.game_name}'`);
        let game_id = resultGame.rows[0].id;
        for(let category of game.categories){
            let insertCategoryQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES('${game_id}', '${category}', '${currentDate}', '${currentDate}')`;
            await pool.query(insertCategoryQuery);
        }
        response.status(204).json();
    } catch(error){
        response.status(500).json({"error": "Unknown server error.", "code": 500});
    }
}

const updateGame = async (request, response) => {
    let game_id = request.params.game_id;

    if(!request.body.game_name){
        response.status(400).json({"error": "'game_id' field is required.", "code": 400});
        return;
    }

    const game = request.body;
    currentDate = new Date().toISOString();

    try{
        let updateQuery = `UPDATE games SET game_name='${game.game_name}', updated_at='${currentDate}' WHERE id='${game_id}'`;
        let result = await pool.query(updateQuery);
        if(result.rowCount == 0){
            response.status(404).json({"error": `Game with ID ${game_id} doesn't exists`, "code": 404});
            return;
        }
        response.status(204).json();
    } catch(error){
        if(codeErrors.invalidType(error)){
            response.status(400).json({"error": `Error: ID must be number`, "code": 400});
        } else if(codeErrors.duplicatedKey(error)){
            response.status(400).json({"error": "Game already exists. Use another name", "code": 400}); 
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const deleteGame = async (request, response) => {
    let game_id = request.params.game_id;
    let deleteQuery = `DELETE FROM games WHERE id='${game_id}'`;

    try{
        let result = await pool.query(deleteQuery);
        if(result.rowCount == 0){
            response.status(404).json({"error": `Game with ID ${game_id} doesn't exists`, "code": 404})
            return;
        }
        response.status(204).json();
    } catch(error){
        if(codeErrors.invalidType(error)){
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