import mysql from "mysql";

const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Lyw114401",
    database: "assignment"
});
db.connect((err) => {
    if (err) console.log(err);
    console.log("Connected!");
});

export const query = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}