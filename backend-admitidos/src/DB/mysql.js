const mysql = require("mysql");
const config = require("../config");

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function conectarDB() {
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.error("Error al conectar a la base de datos: ", err);
            setTimeout(conectarDB, 2000);
        } else {
            console.log("Conexión a la base de datos establecida");
        }
    });

    connection.on('error', (err) => {
        console.error("Error en la conexión a la base de datos: ", err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conectarDB();
        } else {
            throw err;
        }
    });
}

conectarDB();

function show(tabla) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla}`, (err, results) => {
            if (err) {
                console.error("Error al ejecutar la consulta: ", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Ahora recibe primaryKey (por defecto 'id')
function info(tabla, id, primaryKey = 'id') {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${tabla} WHERE ${primaryKey} = ?`, [id], (err, results) => {
            if (err) {
                console.error("Error al ejecutar la consulta: ", err);
                reject(err);
            } else {
                resolve(results[0]);
            }
        });
    });
}

function add(tabla, item) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${tabla} SET ?`, item, (err, results) => {
            return err ? reject(err) : resolve(results);
        });
    });
}

// Ahora busca el ID dinámicamente tanto en el SQL como en el objeto 'item'
function update(tabla, item, primaryKey = 'id') {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${tabla} SET ? WHERE ${primaryKey} = ?`, [item, item[primaryKey]], (err, results) => {
            return err ? reject(err) : resolve(results);
        });
    });
}

function store(tabla, item, primaryKey = 'id') {
    // Verifica si el objeto trae la llave primaria para decidir si edita o crea
    if (item[primaryKey]) {
        return update(tabla, item, primaryKey);
    }
    return add(tabla, item);
}

function deleteItem(tabla, id, primaryKey = 'id') {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${tabla} WHERE ${primaryKey} = ?`, [id], (err, results) => {
            return err ? reject(err) : resolve(results);
        });
    });
}

module.exports = {
    show,
    info,
    store,
    deleteItem
}