'use strict';

const express = require('express');
const { json } = require("body-parser");
const fs = require('fs');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(json());

app.get("/getmessage", (req, res) => {
    // fs.promises.readFile('./posts.txt', {encoding: 'utf8'})
    //     .then(content => {
    //         const result = [];
    //         const lines = content.split('\n');
    //         for (const line of lines) {
    //             // extract each field
    //             const [topic, data, time] = line.split(', ');
    //             result.push({ topic, data, time });
    //         }

    //         res.send(JSON.stringify(result));
    //     });
    fs.promises.readFile('./posts.txt', {encoding: 'utf8'})
        .then(content => res.send(content));
})

app.post('/postmessage', (req, res) => {
    const fileanme = 'posts.txt';
    const {
        topic,
        data,
        time = new Date().toISOString()
    } = req.body;

    fs.appendFileSync(fileanme, `${topic}, ${data}, ${time}\n`);

    res.send('done');
});

app.use('/', express.static('./'));

app.listen(PORT, HOST);
console.log(`Now listening on http://${HOST}:${PORT}`);