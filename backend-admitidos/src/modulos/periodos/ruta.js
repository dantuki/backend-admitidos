const express = require('express');
const respuesta = require('../../red/respuestas');
const controller = require('./controllers');
const router = express.Router();

router.get('/show', show);
router.get('/info/:id', info);
router.post('/store', store);
router.delete('/delete/:id', deleteItem);

async function show(req, res) {
    try {
        const items = await controller.show();
        respuesta.success(req, res, items, 200);
    } catch (err) {
        respuesta.error(req, res, err.message, 500);
    }
}

async function info(req, res) {
    try {
        const item = await controller.info(req.params.id);
        respuesta.success(req, res, item, 200);
    } catch (err) {
        respuesta.error(req, res, err.message, 500);
    }
}

async function store(req, res) {
    try {
        await controller.store(req.body);
        const mensaje = req.body.id_periodo ? 'Periodo actualizado correctamente' : 'Periodo agregado correctamente';
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        respuesta.error(req, res, err.message, 500);
    }
}

async function deleteItem(req, res) {
    try {
        await controller.deleteItem(req.params.id);
        respuesta.success(req, res, 'Periodo eliminado correctamente', 200);
    } catch (err) {
        respuesta.error(req, res, err.message, 500);
    }
}

module.exports = router;