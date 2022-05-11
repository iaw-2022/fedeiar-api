const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes.js');

const getUsers = async (request, response) => {
    try{
        result = await pool.query("SELECT id, name, email, nationality, role, created_at, updated_at FROM users");
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"error": "Unknown server error.", "code": 500});
    }
};


const getUserById = async (request, response) => {
    let user_id = request.params.user_id;
    try{
        result = await pool.query(`SELECT id, name, email, nationality, role, created_at, updated_at FROM users WHERE id='${user_id}'`);
        response.status(200).json(result.rows);
    } catch(error){
        if(errorCodes.invalidType(error)){
            response.status(400).json({"error": "Error: ID must be number", "code": 400});
        } else{
            response.status(500).json({"error": "Unknown server error.", "code": 500});
        }
    }
}

module.exports = {
    getUsers,
    getUserById
};
