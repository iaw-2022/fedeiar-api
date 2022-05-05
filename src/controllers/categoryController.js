const pool = require('../databaseConnection.js');
const dateTime = require('node-datetime');


const getCategories = async (request, response) => {
    let getQuery = `SELECT games.id AS game_id, categories.id AS category_id, game_name, category_name FROM games, categories WHERE games.game_name='${request.params.game_name}' AND games.id=categories.game_id`;
    try{
        const result = await pool.query(getQuery);
        response.status(200).send(result.rows);
    }catch(error){

    }
}


module.exports = {
    getCategories
}