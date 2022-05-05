const dotenv = require('dotenv');
const pool = require('./databaseConnection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dateTime = require('node-datetime');


dotenv.config();
app.use(bodyParser.json());


// ---------------------------------------------- INDEX  ----------------------------------------------

app.get('/', (request, response) => {
    //response.send([1, 2, 3]); // por que se ven feos los arreglos y los json?
    response.send("hola");
});

// ---------------------------------------------- USERS ----------------------------------------------

app.get('/users', (request, response) => {
    pool.query("SELECT id, name, email, nationality, role, created_at, updated_at FROM users", (error, result) => {
        if(error) {
            // Que error puede haber?
            return;
        }
        //response.json(results.rows);
        response.status(200).send(result.rows);
    })
});

app.get('/users/:name', (request, response) => {
    pool.query("SELECT id, name, email, nationality, role, created_at, updated_at FROM users WHERE name='"+request.params.name+"'", (error, result) => {
        if(error) {
            // Que error puede haber?
            return;
        }
        response.status(200).send(result.rows);
    })
});

// ---------------------------------------------- GAMES ----------------------------------------------

app.get('/games', (request, response) => {
    pool.query("SELECT * FROM games", (error, result) => {
        if(error) {
            // Que error puede haber?
            return;
        }
        response.status(200).send(result.rows);
    })
});

app.get('/games/:game_name', (request, response) => {
    let gameName = request.params.game_name;
    pool.query(`SELECT * FROM games WHERE game_name='${gameName}'`, (error, result) => {
        if(error) {
            // que error puede haber?
            return;
        }
        if(result.rows.length == 0){
            response.status(404).send(`game ${gameName} doesn't exists`);
            return;
        }
        response.status(200).send(result.rows);
    });
});

app.post('/games', (request, response) => {
    if(!request.body.game_name){
        response.status(400).send("'game_name' field is required.");
        return;
    }

    const game = request.body;
    currentDate = dateTime.create().format('Y-m-d H:M:S');
    let insertQuery = `INSERT INTO games(game_name, created_at, updated_at) VALUES('${game.game_name}', '${currentDate}', '${currentDate}')`;
    pool.query(insertQuery, (error, result) => {
        if(error){
            response.status(400).send("Error! Game already exists. Please use another name"); // qué codigo de error debería usar?
            return;
        }
        response.status(201).send("Game updated succesfully."); // como hago para devolver el juego insertado? mas que nada para mostrar el ID.
    });
});

app.put('/games/:game_name', (request, response) => {
    let oldGameName = request.params.game_name;
    /*
    pool.query(`SELECT * FROM games WHERE game_name='${oldGameName}'`, (error, results) => {
        if(error){
            // que error puede haber?
            return;
        }
        if(results.rows.length == 0){
            response.status(404).send(`game ${oldGameName} doesn't exists`);
            return;
        }
    });
    */

    if(!request.body.game_name){
        response.status(400).send("'game_name' field is required.");
        return;
    }

    const game = request.body;
    currentDate = dateTime.create().format('Y-m-d H:M:S');
    let updateQuery = `UPDATE games SET game_name='${game.game_name}', updated_at='${currentDate}' WHERE game_name='${oldGameName}'`;
    pool.query(updateQuery, (error, result) => {
        if(error){
            response.status(400).send("Error! Game already exists. Please use another name"); // qué codigo de error debería usar?
            return;
        }
        if(result.rowCount == 0){
            response.status(404).send(`game ${oldGameName} doesn't exists`);
            return;
        }
        response.status(201).send("Game updated succesfully."); // como hago para devolver el juego insertado? mas que nada para mostrar el ID.
    });
});

app.delete('/games/:game_name', (request, response) => {
    let gameName = request.params.game_name;
    let deleteQuery = `DELETE FROM games WHERE game_name='${gameName}'`;

    pool.query(deleteQuery, (error, result) => {
        if(error){
            // Puede haber algún error?
            return;
        }
        if(result.rowCount == 0){
            response.status(404).send(`game ${gameName} doesn't exists`);
            return;
        }
        response.status(201).send("Game deleted succesfully."); // como hago para devolver el juego insertado? mas que nada para mostrar el ID
    });
});

// ---------------------------------------------- CATEGORIES ----------------------------------------------

app.get('/games/:game_name/categories', (request, response) => {
    pool.query(`SELECT games.id, categories.id, game_name, category_name FROM games, categories WHERE games.game_name='${request.params.game_name}' AND games.id=categories.game_id`, (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
});


// ---------------------------------------------- VIDEOS ----------------------------------------------

app.get('/videos', (request, response) => {
    pool.query("SELECT * FROM speedrun_videos", (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
});

app.get('/videos/:id', (request, response) => {
    pool.query("SELECT * FROM speedrun_videos WHERE id="+request.params.id, (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
});

// esto es de videos o de juegos?
app.get('/games/:game_name/videos', (request, response) => {
    pool.query("SELECT * FROM games, speedrun_videos WHERE game_name='"+ request.params.game_name +"' AND games.id=speedrun_videos.game_id", (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
});

// preguntar por estas ruta que puede tener '%'
app.get('/games/:game_name/:category_name/videos', (request, response) => {
    console.log(`SELECT games.id, categories.id, game_name, category_name, speedrun_videos.id FROM games, categories, speedrun_videos WHERE games.game_name='${request.params.game_name}' AND categories.category_name='${request.params.category_name}' AND games.id=speedrun_videos.game_id AND categories.id=speedrun_videos.category_id`);
    pool.query(`SELECT games.id, categories.id, game_name, category_name, speedrun_videos.id FROM games, categories, speedrun_videos WHERE games.game_name='${request.params.game_name}' AND categories.category_name='${request.params.category_name}' AND games.id=speedrun_videos.game_id AND categories.id=speedrun_videos.category_id`, (error, result) => {
        if(!error) {
            response.status(200).send(result.rows);
        }
    })
});


// ---------------------------------------------- SERVER ----------------------------------------------

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Listening on port '+PORT+'...'));