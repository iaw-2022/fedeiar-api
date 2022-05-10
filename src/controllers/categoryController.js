const pool = require('../databaseConnection.js');
const dateTime = require('node-datetime');


const getCategories = async (request, response) => {
    let game_id = request.params.game_id;
    try{
        let getQuery = `SELECT * FROM categories WHERE game_id='${game_id}'`;
        const result = await pool.query(getQuery);
        response.status(200).send(result.rows);
    } catch(error){
        response.status(500).send("Unknown server error.");
    }
}

const addCategoryToGame = async(request, response) => {
    let game_id = request.params.game_id;
    let categoryName = request.body.category;
    if(!categoryName){
        response.status(400).send("'category' field is required");
        return;
    }

    currentDate = dateTime.create().format('Y-m-d H:M:S');
    try{
        let insertQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES (${game_id}, '${categoryName}', '${currentDate}', '${currentDate}')`;
        await pool.query(insertQuery);
        response.status(201).send("Category created succesfully");
    } catch(error){
        if(error.code = 23505){
            response.status(400).send("Error! Category already exists for that game");
        } else{
            response.status(500).send("Unknown server error.");
        }
    }
}

const updateCategories = async (request, response) => {
    let game_id = request.params.game_id;
    let newCategories = request.body.categories;
    if(!newCategories || !Array.isArray(newCategories) || newCategories.length == 0){
        response.status(400).send("'categories' array field is required and is must not be an empty array");
        return;
    }
    newCategories = [...new Set(newCategories)]; // Elimina categorias duplicadas

    try{
        let oldCategoriesQuery = `SELECT id FROM categories WHERE game_id=${game_id}`;
        let oldCategoriesResult = await pool.query(oldCategoriesQuery);
        //hacer la consulta y salir si no existe el id.
        for(categoryRow of oldCategoriesResult.rows){
            await pool.query(`DELETE FROM categories WHERE id=${categoryRow.id}`)

        }
    } catch(error){
        response.status(500).send(`Unknown server error.`);
    }

    currentDate = dateTime.create().format('Y-m-d H:M:S');
    try{
        for(categoryName of newCategories){
            let categoryInsertQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES (${game_id}, '${categoryName}', '${currentDate}', '${currentDate}')`
            await pool.query(categoryInsertQuery);
        }
        response.status(201).send("categories updated succesfully");
    } catch(error){
        response.status(500).send("Unknown server error.");
    }
}

module.exports = {
    getCategories,
    addCategoryToGame,
    updateCategories
}