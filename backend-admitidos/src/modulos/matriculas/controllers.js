const db = require('../../DB/mysql');

const tabla = "matriculas";
const campoId = "id_matricula"; 

function show() {
    return db.show(tabla);
}

function info(id) {
    return db.info(tabla, id, campoId);
}

function store(item) {
    return db.store(tabla, item, campoId);
}

function deleteItem(id) {
    return db.deleteItem(tabla, id, campoId);
}

module.exports = {
    show,
    info,
    store,
    deleteItem
}