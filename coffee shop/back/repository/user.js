// import { response } from 'express';
import { query } from './db.js';

export const getUser = async (password) => {
    
    let sql = 'SELECT * FROM user WHERE password =' + "'"+password+"'";
    const result = await query(sql);
    console.log(result);
    return result;
    
    // let sql = 'SELECT * FROM user' + (password ? ` WHERE password = '${password}'` : '');
    // const result = await query(sql)
    //     .then(function (res) {
    //         // console.log(res);
    //         return res.data;
    //     }).catch(err => {
    //         // console.log(err);
    //     });
    // // console.log(Promise.resolve(result) );
    // // return password ? result[0] : result;
}
// export const getUser = (password) => {
//     return new Promise((resolve, reject) => {

//         let sql = 'SELECT * FROM user' + (password ? ` WHERE password = '${password}'` : '');
//         query(sql,(err, result) =>{
//             if (err) {
//                 reject(err);
//             }else{return resolve(password ? result[0] : result)}
//         });
//     })
// }

export const addUser = async (user) => {
    let test = await getUser(user.password);
    // console.log(test);
    if (test === null) {
        await query(`INSERT INTO user (username, password, name, role) VALUES ('${user.username}', '${user.password}','${user.name}', '${user.role}')`);
    } else { return false }
};
const sql = 'CREATE TABLE IF NOT EXISTS `user` (id int NOT NULL AUTO_INCREMENT, username VARCHAR(50), password VARCHAR(50), name VARCHAR(50), role VARCHAR(50) , PRIMARY KEY (id))';
query(sql);