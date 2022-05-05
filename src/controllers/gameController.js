const pool = require('../databaseConnection.js');
const dateTime = require('node-datetime');

const getGames = (request, response) => {
    pool.query("SELECT * FROM games", (error, result) => {
        if(error) {
            // Que error puede haber?
            return;
        }
        response.status(200).send(result.rows);
    })
}

const getGameByName = (request, response) => {
    let gameName = request.params.game_name;
    pool.query(`SELECT * FROM games WHERE game_name='${gameName}'`, (error, result) => {
        if(error) {
            // que error puede haber?
            return;
        }
        if(result.rows.length == 0){
            response.status(404).send(`game ${gameName} doesn't exists`);
            return;
        }
        response.status(200).send(result.rows);
    });
}

const createGame = (request, response) => {
    if(!request.body.game_name){
        response.status(400).send("'game_name' field is required.");
        return;
    }

    const game = request.body;
    currentDate = dateTime.create().format('Y-m-d H:M:S');
    let insertQuery = `INSERT INTO games(game_name, created_at, updated_at) VALUES('${game.game_name}', '${currentDate}', '${currentDate}')`;
    pool.query(insertQuery, (error, result) => {
        if(error){
            response.status(400).send("Error! Game already exists. Please use another name"); // qué codigo de error debería usar?
            return;
        }
        response.status(201).send("Game updated succesfully."); // como hago para devolver el juego insertado? mas que nada para mostrar el ID.
    });
}

const updateUser = async (request, response) => {
    let oldGameName = request.params.game_name;

    if(!request.body.game_name){
        response.status(400).send("'game_name' field is required.");
        return;
    }

    const game = request.body;
    currentDate = dateTime.create().format('Y-m-d H:M:S');
    let updateQuery = `UPDATE games SET game_name='${game.game_name}', updated_at='${currentDate}' WHERE game_name='${oldGameName}'`;
    pool.query(updateQuery, (error, result) => {
        if(error){
            response.status(400).send("Error! Game already exists. Please use another name"); // qué codigo de error debería usar?
            return;
        }
        if(result.rowCount == 0){
            response.status(404).send(`game ${oldGameName} doesn't exists`);
            return;
        }
        response.status(200).send("Game updated succesfully."); // como hago para devolver el juego insertado? mas que nada para mostrar el ID.
    });
}

const deleteUser = (request, response) => {
    let gameName = request.params.game_name;
    let deleteQuery = `DELETE FROM games WHERE game_name='${gameName}'`;

    pool.query(deleteQuery, (error, result) => {
        if(error){
            // Puede haber algún error?
            return;
        }
        if(result.rowCount == 0){
            response.status(404).send(`game ${gameName} doesn't exists`);
            return;
        }
        response.status(200).send("Game deleted succesfully."); // como hago para devolver el juego insertado? mas que nada para mostrar el ID
    });
}

module.exports = {
    getGames,
    getGameByName,
    createGame,
    updateUser,
    deleteUser
}