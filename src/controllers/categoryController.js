const pool = require('../databaseConnection.js');
const dateTime = require('node-datetime');


const getCategories = async (request, response) => {
    let getQuery = `SELECT games.id AS game_id, categories.id AS category_id, game_name, category_name FROM games, categories WHERE games.game_name='${request.params.game_name}' AND games.id=categories.game_id`;
    try{
        const result = await pool.query(getQuery);
        response.status(200).send(result.rows);
    } catch(error){

    }
}

const addCategoryToGame = async(request, response) => {
    let gameName = request.params.game_name;
    let categoryName = request.body.category;
    if(!categoryName){
        response.status(400).send("'category' field is required");
        return;
    }

    let game_id = await getGameId(gameName);
    if(!game_id){ 
        response.status(404).send(`Game ${gameName} doesn't exists`);
        return;
    }
    currentDate = dateTime.create().format('Y-m-d H:M:S');
    try{
        let insertQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES (${game_id}, '${categoryName}', '${currentDate}', '${currentDate}')`;
        await pool.query(insertQuery);
        response.status(201).send("category created succesfully");
    } catch(error){
        response.status(400).send("Error! Category already exists for that game");
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

const updateCategories = async (request, response) => {
    let gameName = request.params.game_name;
    let newCategories = request.body.categories;
    if(!newCategories || !Array.isArray(newCategories) || newCategories.length == 0){
        response.status(400).send("'categories' array field is required and is must not be an empty array");
        return;
    }
    newCategories = [...new Set(newCategories)]; // Elimina categorias duplicadas

    let game_id = await getGameId(gameName);
    if(!game_id){ 
        response.status(404).send(`Game ${gameName} doesn't exists`);
        return;
    }
    try{
        let oldCategoriesQuery = `SELECT id FROM categories WHERE game_id=${game_id}`;
        let oldCategoriesResult = await pool.query(oldCategoriesQuery);
        for(categoryRow of oldCategoriesResult.rows){
            await pool.query(`DELETE FROM categories WHERE id=${categoryRow.id}`)
        }
    } catch(error){
        response.status(404).send(`Game ${gameName} doesn't exists`);
    }

    currentDate = dateTime.create().format('Y-m-d H:M:S');
    try{
        for(categoryName of newCategories){
            let categoryInsertQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES (${game_id}, '${categoryName}', '${currentDate}', '${currentDate}')`
            await pool.query(categoryInsertQuery);
        }
        response.status(201).send("categories updated succesfully");
    } catch(error){
        // que error puede haber?
        response.status(400).send("Error!");
    }
}

module.exports = {
    getCategories,
    addCategoryToGame,
    updateCategories
}