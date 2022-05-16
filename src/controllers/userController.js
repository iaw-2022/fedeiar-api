const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes.js');
const escape = require('pg-escape');

const getUsers = async (request, response) => {
    try{
        result = await pool.query("SELECT id, name, email, nationality, role, created_at, updated_at FROM users");
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"message": "Unknown server error.", "code": 500});
    }
};


const getUserById = async (request, response) => {
    let user_id = request.params.user_id.toString();
    try{
        let result = await pool.query(`SELECT id, name, email, nationality, role, created_at, updated_at FROM users WHERE id=${escape.literal(user_id)}`);
        if(result.rowCount == 0){
            response.status(404).json({"message": `User with ID ${user_id} doesn't exists`, "code": 404});
            return;
        }
        response.status(200).json(result.rows[0]);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"message": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

module.exports = {
    getUsers,
    getUserById
};
