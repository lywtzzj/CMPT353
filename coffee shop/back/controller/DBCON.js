import mysql from "mysql";


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