// CMPT353
// Yuwen Liu yul905
// 11219371
'use strict';

// load package
const express = require('express');
const { json } = require("body-parser");
const mysql = require('mysql');
const { setFlagsFromString } = require('v8');


const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

const user_id = 4;
const coffee_id = 6;
const role = "customer";

app.use(json());


var DBconnect = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Lyw114401",
    database: "assignment"
});
DBconnect.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected!");
});


app.post('/register', (req, res) => {

    const {
        username,
        password,
    } = req.body;
    let sql = 'SELECT * FROM user;';
    DBconnect.query(sql, function (err, result, fields) {
        if (err) throw err;
    }) 
    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (user_id == element.id) {
            res.send('false');
            // how to stop
            return false

        }
    }

    var sql = "INSERT INTO user (Id, Username, Password, Role) VALUES ('" + user_id + "','" + username + "','" + password + "','" + role + "');";

    DBconnect.query(sql, function (err, result) {
        if (err) throw err;
    });

    let new_user = {
        user_id,
        username,
        password,
        role
    }
    res.send(new_user);
});

app.post('/login', (req, res) => {

    const {
        username,
        password,
    } = req.body;
    var sql = 'SELECT * FROM user;';
    DBconnect.query(sql, function (err, result, fields) {
        if (err) throw err;
    }) 
    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (user_id == element.id) {
            res.send(element);

        }
    }
    // res.send('true');
});

app.get("/getmenu", (req, res) => {

    var sql = 'SELECT * FROM menu;';
    DBconnect.query(sql, function (err, result, fields) {
        if (err) throw err;

        res.json(result);
    })
});

app.post('/AddMenu', (req, res) => {

    const {
        coffeeName,
        unitPrice,
    } = req.body;

    var sql = 'SELECT * FROM menu;';
    DBconnect.query(sql, function (err, result, fields) {
        if (err) throw err;
    }) 

    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        if (coffee_id == element.id) {
            res.send('false');
            // how to stop
            return false

        }
    }

    var sql = "INSERT INTO menu (Id, Name, UnitPrice) VALUES ('" + coffee_id + "','" + coffeeName + "','" + unitPrice + "');";

    DBconnect.query(sql, function (err, result) {
        if (err) throw err;

        res.json(result);
    });
});

app.put("/modifyMenu", (req,res)=>{

    let Mcoffee_id = 0;
    const {
        coffeeName,
        unitPrice,
        // time = new Date()
        // .toISOString()
    } = req.body;
    let sql = 'SELECT * FROM menu;';
    DBconnect.query(sql, function (err, result, fields) {
        if (err) throw err;
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            if (coffeeName == element.Name) {
                let Mcoffee_id = element.Id
            }
        }
        // res.json(result);
    })
    // how to insert new
    let sql = 'UPDATE menu SET Name=' + coffeeName+', UnitPrice='+unitPrice+'where Id ='+Mcoffee_id+';';
    
})

app.get("/getmessageByTime", (req, res) => {


    var sql = 'SELECT * FROM posts ORDER BY Time;';
    DBconnect.query(sql, function (err, result, fields) {
        if (err) throw err;

        res.json(result);
    })
});
app.get("/getmessageByTopic", (req, res) => {
    // fs.promises.readFile('./posts.txt', { encoding: 'utf8' })
    //     .then(content => res.send(content));
    var data;

    var sql = 'SELECT * FROM posts ORDER BY Topic;';
    DBconnect.query(sql, function (err, result, fields) {
        if (err) throw err;

        res.json(result);
    })
});
app.use('/', express.static('./'));


app.listen(PORT, HOST);

console.log(`Now listening on http://${HOST}:${PORT}`);