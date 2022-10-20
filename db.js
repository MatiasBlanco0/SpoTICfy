const mysql = require("mysql2");

const conn = mysql.createConnection({
    // Completar con los datos de la conexión
    host:"localhost",
    user: 'root',
    password: 'rootroot',
    database: 'spoticfy'
});

module.exports = conn;