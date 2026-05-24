const db = require('../../DB/mysql');

const tabla = "admisiones";
const campoId = "id_admision"; 

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