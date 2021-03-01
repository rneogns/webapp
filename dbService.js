'use strict';

const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    //console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new  Promise((resolve, reject) => {
               const query = "SELECT * FROM names;";

               connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
               });
            });

            //console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new  Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?, ?);";
 
                connection.query(query, [name, dateAdded], (err, result) => {
                 if (err) reject(new Error(err.message));
                 resolve(result.insertId);
                })
             });
 
             console.log(insertId);
             return {
                 id: insertId,
                 name: name,
                 dateAdded: dateAdded
             };
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new  Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?;";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10);
            const response = await new  Promise((resolve, reject) => {
                const query = "UPDATE names SET `name` = ? WHERE id = ?";              

                connection.query(query, [name, id], (err, result) => {
                    //console.log(result);
                    if (err) reject(new Error(err.message));                           
                    resolve(result.affectedRows);
                })
            });
            
            //console.log(response);
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchRowByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT id, `name`, date_added FROM names WHERE name = ?";

                connection.query(query, [name], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result)
                });
            });

            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;