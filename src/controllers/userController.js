const pool = require('../databaseConnection.js');

const getUsers = (request, response) => {
    pool.query("SELECT id, name, email, nationality, role, created_at, updated_at FROM users", (error, result) => {
        if(error) {
            // Que error puede haber?
            return;
        }
        //response.json(results.rows);
        response.status(200).send(result.rows);
    })
};


const getUserByName = (request, response) => {
    pool.query("SELECT id, name, email, nationality, role, created_at, updated_at FROM users WHERE name='"+request.params.name+"'", (error, result) => {
        if(error) {
            // Que error puede haber?
            return;
        }
        response.status(200).send(result.rows);
    })
}

module.exports = {
    getUsers,
    getUserByName
};
