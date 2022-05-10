const pool = require('../databaseConnection.js');

const getUsers = async (request, response) => {
    try{
        result = await pool.query("SELECT id, name, email, nationality, role, created_at, updated_at FROM users");
        //response.json(results.rows);
        response.status(200).send(result.rows);
    } catch(error){
        response.status(500).send("Unknown server error.");
    }
};


const getUserById = async (request, response) => {
    let user_id = request.params.user_id;
    try{
        result = await pool.query(`SELECT id, name, email, nationality, role, created_at, updated_at FROM users WHERE id='${user_id}'`);
        response.status(200).send(result.rows);
    } catch(error){
        console.log(error);
        if(error.code == '22P02'){
            response.status(400).send("Please insert a valid user id");
        } else{
            response.status(500).send("Unknown server error.");
        }
    }
}

module.exports = {
    getUsers,
    getUserById
};
