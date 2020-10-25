// CMPT353
// Yuwen Liu yul905
// 11219371
'use strict';

// load package
const express = require('express');
const { json } = require("body-parser");
const fs = require('fs');


const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(json());

app.post('/postmessage', (req, res) => {
    var fileanme = 'posts.txt'

    const { topic, data, time = new Date().toISOString() } = req.body;
    fs.appendFileSync(fileanme, `${topic}, ${data}, ${time}\n`);

    res.send('done');
});

app.get("/getmessage", (req, res) => {
    fs.promises.readFile('./posts.txt', { encoding: 'utf8' })
        .then(content => res.send(content));
})
app.use('/', express.static('./'));


app.listen(PORT, HOST);

console.log(`Now listening on http://${HOST}:${PORT}`);