// import { response } from 'express';
import { query } from './db.js';

export const getUser = async (user) => {
    let sql = "SELECT * FROM user WHERE username = '"+user.username+"'";
    const result = await query(sql);
    // console.log("before return");
    // console.log(result);
    return result[0];


    // let sql = 'SELECT * FROM user WHERE password =' + "'"+password+"'";
    // const result = await query(sql);
    // console.log(result);
    // return result;

}

export const addUser = async (user) => {
    let sql = "SELECT * FROM user WHERE username = '"+user.username+"'";
    const result = await query(sql);
    // console.log(result);
    if (result === null) {
        await query(`INSERT INTO user (username, password, name, role) VALUES ('${user.username}', '${user.password}','${user.name}', '${user.role}')`);
        return await getUser(user);
    } else { return false }
};
const sql = 'CREATE TABLE IF NOT EXISTS `user` (id int NOT NULL AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(50), name VARCHAR(50), role VARCHAR(50) , PRIMARY KEY (id))';
query(sql);