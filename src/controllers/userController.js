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
    let user_email = request.auth.payload['https://example.com/email'];
    if(user_email == null){
        response.status(401).json({"message": "User must be logged in auth0 in order to use this route.", "code": 401});
        return;
    }
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

const updateUser = async (request, response) => {
    let email = request.auth.payload['https://example.com/email'];
    let user = request.body;
    
    if(email == null){
        response.status(401).json({"message": "User must be logged in auth0 in order to use this route.", "code": 401});
        return;
    }
    
    if(!user.user_name || !user.nationality){
        response.status(400).json({"message": "One of the following fields is missing: 'user_name' ,'nationality'", "code": 400});
        return;
    }
    let user_name = user.user_name.toString(), nationality = user.nationality.toString();
    email = email.toString();
    currentDate = new Date().toISOString();

    try{
        let updateUserQuery = `UPDATE users SET user_name=${escape.literal(user_name)}, nationality=${escape.literal(nationality)}, updated_at='${currentDate}' WHERE email=${escape.literal(email)}`;
        await pool.query(updateUserQuery);
        response.status(204).json();
    } catch(error){
        if(errorCodes.duplicatedKey(error)){
            response.status(400).json({"message": "Error, username already exists, choose another username", "code": 400});
        } else{
            response.status(500).json({"message": "Unknown server error.", "code": 500});
        }
    }
}

const deleteUser = async (request, response) => {
    const email = request.auth.payload['https://example.com/email'];

    if(email == null){
        response.status(401).json({"message": "User must be logged in auth0 in order to use this route.", "code": 401});
        return;
    }

    try{
        const deleteQuery = `DELETE FROM users WHERE email=${escape.literal(email)}`;
        await pool.query(deleteQuery);
        response.status(204).json();
    } catch(error){
        response.status(500).json({"message": "Unknown server error.", "code": 500});
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};
