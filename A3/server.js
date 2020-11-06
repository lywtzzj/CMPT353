// CMPT353
// Yuwen Liu yul905
// 11219371
'use strict';

// load package
const express = require('express');
const { json } = require("body-parser");
const mysql = require('mysql');


const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(json());



// var DBconnect = mysql.createConnection({
//     host: "localhost",
//     port: "3306",
//     user: "root",
//     password: "Lyw114401",
//     database: "assignment"
// });
var DBconnect = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Lyw114401",
    database: "fora_three"
});
DBconnect.connect(function (err) {
    if (err) console.log(err);
    console.log("Connected!");

    // var sql = "create table posts (Topic VARCHAR(255), Data VARCHAR(255), Time timestamp default now())";
    // DBconnect.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Connected!");
    // });
    // DBconnect.query(function (err, result) {
    //     if (err) throw err;
    //     console.log("Connected!");
    // });

    // res.send("ok");
});


app.post('/postmessage', (req, res) => {
    // var fileanme = 'posts.txt'

    const {
        topic,
        data,
        // time = new Date()
        // .toISOString()
    } = req.body;
    // fs.appendFileSync(fileanme, `${topic}, ${data}, ${time}\n`,
    //     { flags: 'a' }
    // );

    var sql = "INSERT INTO posts (Topic, Data, Time) VALUES ('"+topic +"','"+data +"','" +new Date().toISOString() +"');";
    // .toISOString()+");";
    // + topic + "," + data + "," + time + ")";
    // `${topic}, ${data}, ${time}`);
    DBconnect.query(sql, function (err, result) {
        if (err) throw err;
    });
    res.send('done');
});

app.get("/getmessage", (req, res) => {
    // fs.promises.readFile('./posts.txt', { encoding: 'utf8' })
    //     .then(content => res.send(content));
    var data;

    var sql = 'SELECT * FROM posts';
    DBconnect.query(sql, function (err, result, fields) {
        if (err) throw err;

        res.json(result);
    })
});
app.use('/', express.static('./'));


app.listen(PORT, HOST);

console.log(`Now listening on http://${HOST}:${PORT}`);