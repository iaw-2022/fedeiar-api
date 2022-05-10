const pool = require('../databaseConnection.js');
const dateTime = require('node-datetime');

const getGames = async (request, response) => {
    try{
        let result = await pool.query("SELECT * FROM games");
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).send("Unknown server error.");
    }
}

const getGameById = async (request, response) => {
    let game_id = request.params.game_id;
    try{
        result =  await pool.query(`SELECT * FROM games WHERE id=${game_id}`);
        if(result.rows.length == 0){
            response.status(404).send(`Game with ID ${game_id} doesn't exists`);
            return;
        }
        response.status(200).send(result.rows[0]);
    } catch(error){
        response.status(500).send("Unknown server error.");
    }
}

const createGameWithCategories = async (request, response) => {
    const game = request.body;
    if(!game.game_name){
        response.status(400).send("'game_name' field is required.");
        return;
    }
    if(!game.categories || !Array.isArray(game.categories) ||game.categories.length == 0){
        response.status(400).send("'categories' array field is required and is must not be an empty array");
        return;
    }
    game.categories = [...new Set(game.categories)]; // Elimina categorias duplicadas
    
    currentDate = dateTime.create().format('Y-m-d H:M:S');
    
    try{
        let insertGameQuery = `INSERT INTO games(game_name, created_at, updated_at) VALUES('${game.game_name}', '${currentDate}', '${currentDate}')`;
        const result = await pool.query(insertGameQuery);
    } catch(error){
        if(error.code == 23505){
            response.status(400).send("Error! Game already exists. Please use another name"); // qué codigo de error debería usar?
        } else{
            response.status(500).send("Unknown server error");
        }
        return;
    }

    try{
        let resultGame = await pool.query(`SELECT * FROM games WHERE game_name='${game.game_name}'`);
        let game_id = resultGame.rows[0].id;
        for(let category of game.categories){
            let insertCategoryQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES(${game_id}, '${category}', '${currentDate}', '${currentDate}')`;
            await pool.query(insertCategoryQuery);
        }
        response.status(204).send();
    } catch(error){
        response.status(500).send({"error": "Unknown server error.", "code": 500});
    }
}

const updateGame = async (request, response) => {
    let game_id = request.params.game_id;

    if(!request.body.game_name){
        response.status(400).send("'game_name' field is required.");
        return;
    }

    const game = request.body;
    currentDate = dateTime.create().format('Y-m-d H:M:S');

    try{
        let updateQuery = `UPDATE games SET game_name='${game.game_name}', updated_at='${currentDate}' WHERE id=${game_id}`;
        let result = await pool.query(updateQuery);
        if(result.rowCount == 0){
            response.status(404).send(`Game with ID ${game_id} doesn't exists`);
            return;
        }
        response.status(200).send(`Game with ID ${game_id} updated succesfully.`); // como hago para devolver el juego insertado? mas que nada para mostrar el ID.
    } catch(error){
        if(error.code == 23505){
            response.status(400).send("Error! Game already exists. Please use another name"); // qué codigo de error debería usar?
        } else{
            response.status(500).send("Unknown server error.");
        }
    }
}

const deleteGame = async (request, response) => {
    let game_id = request.params.game_id;
    let deleteQuery = `DELETE FROM games WHERE id=${game_id}`;

    try{
        let result = await pool.query(deleteQuery);
        if(result.rowCount == 0){
            response.status(404).send(`Game with ID ${game_id} doesn't exists, nothing to delete`);
            return;
        }
        response.status(200).send(`Game with ID ${game_id} deleted succesfully.`); // como hago para devolver el juego insertado? mas que nada para mostrar el ID
    } catch(error){
        response.status(500).send("Unknown server error.");
    }
}

module.exports = {
    getGames,
    getGameById,
    createGameWithCategories,
    updateGame,
    deleteGame
}