const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes.js');

const getCategories = async (request, response) => {
    let game_id = request.params.game_id;
    try{
        let getQuery = `SELECT * FROM categories WHERE game_id='${game_id}'`;
        const result = await pool.query(getQuery);
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"error": "Unknown server error.", "code": 500});
    }
}

const addCategoryToGame = async(request, response) => {
    let game_id = request.params.game_id;
    let categoryName = request.body.category;
    if(!categoryName){
        response.status(400).json({"error": "'category' field is required", "code": 400});
        return;
    }

    currentDate = new Date().toISOString();
    try{
        let insertQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES ('${game_id}', '${categoryName}', '${currentDate}', '${currentDate}')`;
        let result = await pool.query(insertQuery);
        response.status(204).json();
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": `Error: ID must be number`, "code": 400});
        } else if(errorCodes.missingKey(error)){
            response.status(400).json({"error": "check that the game_id exists", "code": 400})
        } else if(errorCodes.duplicatedKey(error)){
            response.status(400).json({"error": "Category already exists for that game", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

const updateCategories = async (request, response) => {
    let game_id = request.params.game_id;
    let newCategories = request.body.categories;
    if(!newCategories || !Array.isArray(newCategories) || newCategories.length == 0){
        response.status(400).json({"error": "'categories' array field is required and is must not be an empty array", "code": 400});
        return;
    }
    newCategories = [...new Set(newCategories)]; // Elimina categorias duplicadas

    try{
        let oldCategoriesQuery = `SELECT id FROM categories WHERE game_id='${game_id}'`;
        let oldCategoriesResult = await pool.query(oldCategoriesQuery);
        if(oldCategoriesResult.rowCount == 0){
            response.status(404).json({"error": `Game with ID ${game_id} doesn't exists`, "code": 404});
            return;
        }
        for(categoryRow of oldCategoriesResult.rows){
            await pool.query(`DELETE FROM categories WHERE id='${categoryRow.id}'`)
        }
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
        return;
    }

    currentDate = new Date().toISOString();
    try{
        for(categoryName of newCategories){
            let categoryInsertQuery = `INSERT INTO categories(game_id, category_name, created_at, updated_at) VALUES ('${game_id}', '${categoryName}', '${currentDate}', '${currentDate}')`
            await pool.query(categoryInsertQuery);
        }
        response.status(204).json();
    } catch(error){
        response.status(500).json({"error": "Unknown server error.", "code": 500});
    }
}

module.exports = {
    getCategories,
    addCategoryToGame,
    updateCategories
}