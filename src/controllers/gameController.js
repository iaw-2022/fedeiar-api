const pool = require('../databaseConnection.js');
const dateTime = require('node-datetime');

const getGames = async (request, response) => {
    try{
        let result = await pool.query("SELECT * FROM games");
        response.status(200).send(result.rows);
    } catch(error){
        // Que error puede haber?
    }
}

const getGameByName = async (request, response) => {
    let gameName = request.params.game_name;

    try{
        result =  await pool.query(`SELECT * FROM games WHERE game_name='${gameName}'`);
        if(result.rows.length == 0){
            response.status(404).send(`game ${gameName} doesn't exists`);
            return;
        }
        response.status(200).send(result.rows[0]);
    } catch(error){
        // que error puede haber?
    }
}

const createGameWithCategories = async (request, response) => {
    const game = request.body;
    if(!game.game_name){
        response.status(400).send("'game_name' field is required.");
        return;
    }
    if(!game.categories || game.categories.length == 0){
        response.status(400).send("'categories' field is required and is must not be empty");
        return;
    }
    game.categories = [...new Set(game.categories)]; // Elimina categorias duplicadas
    
    currentDate = dateTime.create().format('Y-m-d H:M:S');
    
    try{
        let insertGameQuery = `INSERT INTO games(game_name, created_at, updated_at) VALUES('${game.game_name}', '${currentDate}', '${currentDate}')`;
        const result = await pool.query(insertGameQuery);
    } catch(error){
        response.status(400).send("Error! Game already exists. Please use another name"); // qué codigo de error debería usar?
        return;
    }

    try{
        let resultGame = await pool.query(`SELECT * FROM games WHERE game_name='${game.game_name}'`);
        let game_id = resultGame.rows[0].id;
        for(let category of game.categories){
            let insertCategoryQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES(${game_id}, '${category}', '${currentDate}', '${currentDate}')`;
            await pool.query(insertCategoryQuery);
        }
        response.status(201).send("Game and categories created succesfully.");
    } catch(error){
        response.status(400).send("Error!");
    }
}

const updateUser = async (request, response) => {
    let oldGameName = request.params.game_name;

    if(!request.body.game_name){
        response.status(400).send("'game_name' field is required.");
        return;
    }

    const game = request.body;
    currentDate = dateTime.create().format('Y-m-d H:M:S');

    try{
        let updateQuery = `UPDATE games SET game_name='${game.game_name}', updated_at='${currentDate}' WHERE game_name='${oldGameName}'`;
        let result = await pool.query(updateQuery);
        if(result.rowCount == 0){
            response.status(404).send(`game ${oldGameName} doesn't exists`);
            return;
        }
        response.status(200).send("Game updated succesfully."); // como hago para devolver el juego insertado? mas que nada para mostrar el ID.
    } catch(error){
        response.status(400).send("Error! Game already exists. Please use another name"); // qué codigo de error debería usar?
    }
}

const deleteUser = async (request, response) => {
    let gameName = request.params.game_name;
    let deleteQuery = `DELETE FROM games WHERE game_name='${gameName}'`;

    try{
        let result = await pool.query(deleteQuery);
        if(result.rowCount == 0){
            response.status(404).send(`game ${gameName} doesn't exists`);
            return;
        }
        response.status(200).send("Game deleted succesfully."); // como hago para devolver el juego insertado? mas que nada para mostrar el ID

    } catch(error){
        // puede haber algun error?
    }
}

module.exports = {
    getGames,
    getGameByName,
    createGameWithCategories,
    updateUser,
    deleteUser
}