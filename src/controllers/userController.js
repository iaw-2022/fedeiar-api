const pool = require('../databaseConnection.js');

const getUsers = async (request, response) => {
    try{
        result = await pool.query("SELECT id, name, email, nationality, role, created_at, updated_at FROM users");
        //response.json(results.rows);
        response.status(200).send(result.rows);
    } catch(error){
        // Que error puede haber?
    }
};


const getUserByName = async (request, response) => {
    let username = request.params.name;
    try{
        result = await pool.query(`SELECT id, name, email, nationality, role, created_at, updated_at FROM users WHERE name='${username}'`);
        response.status(200).send(result.rows);
    } catch(error){
        response.status(400).send("Please insert a valid user name");
    }
}

module.exports = {
    getUsers,
    getUserByName
};
