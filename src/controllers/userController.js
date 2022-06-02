const pool = require('../databaseConnection.js');
const errorCodes = require('../errorCodes.js');
const escape = require('pg-escape');

const getUsers = async (request, response) => {
    try{
        result = await pool.query("SELECT id, user_name, email, nationality, role, created_at, updated_at FROM users");
        response.status(200).json(result.rows);
    } catch(error){
        response.status(500).json({"message": "Unknown server error.", "code": 500});
    }
};


const getUserById = async (request, response) => {
    let user_id = request.params.user_id.toString();
    try{
        let result = await pool.query(`SELECT id, user_name, email, nationality, role, created_at, updated_at FROM users WHERE id=${escape.literal(user_id)}`);
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

const getUserByEmail = async (request, response) => {
    let user_email = request.params.user_email.toString();
    try{
        let result = await pool.query(`SELECT id, user_name, email, nationality, role, created_at, updated_at FROM users WHERE email=${escape.literal(user_email)}`);
        if(result.rowCount == 0){
            response.status(404).json({"message": `User with email ${user_email} doesn't exists`, "code": 404});
            return;
        }
        response.status(200).json(result.rows[0]);
    } catch(error){
        response.status(500).json({"message": "Unknown server error.", "code": 500});
    }
}

const createUser = async (request, response) => {
    let email = request.auth.payload['https://example.com/email'];
    let user = request.body;
    
    if(email == null){
        email = 'user_swagger_test'+Math.floor(Math.random() * 1000000);
    }
    

    if(!user.user_name || !user.nationality){
        response.status(400).json({"message": "One of the following fields is missing: 'user_name' ,'nationality'", "code": 400});
        return;
    }
    let user_name = user.user_name.toString(), nationality = user.nationality.toString(), role = 'final_user';
    email = email.toString();
    currentDate = new Date().toISOString();

    try{
        let insertUserQuery = `INSERT INTO users(user_name, email, nationality, role, created_at, updated_at) VALUES(${escape.literal(user_name)}, ${escape.literal(email)}, ${escape.literal(nationality)}, ${escape.literal(role)}, '${currentDate}', '${currentDate}')`;
        await pool.query(insertUserQuery);
        response.status(204).json();
    } catch(error){
        if(errorCodes.duplicatedKey(error)){
            response.status(400).json({"message": "Error, username already exists, choose another username", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser
};
