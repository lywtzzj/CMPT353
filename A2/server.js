// CMPT353
// Yuwen Liu yul905
// 11219371
'use strict';

// load package
const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');


const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save', (req, res) => {
  var fileanme = 'feedback.txt'

  // debugger
  const {topic, data} = req.body;
  // TODO write to file (maybe using fs)
  fs.writeFileSync('./' + fileanme, topic + ', ' + data + ','+ Date.now() + '\n', {flag: 'a+'}, err => {
    if (err) {
      console.error(err)
      return      
    }
    res.send('ok');
  });
  
  res.send('done');
});

app.use('/', express.static('./'));


app.listen(PORT, HOST);

console.log(`Now listening on http://${HOST}:${PORT}`);