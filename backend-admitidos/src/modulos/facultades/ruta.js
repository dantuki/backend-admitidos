const express = require('express');
const respuesta = require('../../red/respuestas');
const controller = require('./controllers');
const router = express.Router();

/*router.get('/',(req, res) => {
    res.send('Hola desde la ruta de facultades');
});

/*router.get('/',(req, res) => {
    respuesta.success(req, res, 'Facultades obtenidas', 200);
});*/

router.get('/show', show);
router.get('/info/:id', info);
router.post('/store', store);
router.delete('/delete/:id', deleteItem);

async function show(req, res){
   const items = await controller.show();
   respuesta.success(req, res, items, 200);
}

async function info(req, res){
    try{
        const item = await controller.info(req.params.id);
        if (!item) {
            respuesta.error(req, res, 'Facultad no encontrada', 404);
            return;
        }
        respuesta.success(req, res, item, 200);
    }
    catch(error) {
        console.log(error); //solo para desarrollo, no dejar en producción
        respuesta.error(req, res, error.message, 404);
    }
}

async function store(req, res){
    try{
        const item = await controller.store(req.body);
        if (req.body.id == null) {
            message = 'Facultad agregada correctamente';
        } else {
            message = 'Facultad actualizada correctamente';
        }
        respuesta.success(req, res, message, 200);
    }
    catch(error) {
        console.log(error); //solo para desarrollo, no dejar en producción
        respuesta.error(req, res, error.message, 404);
    }
}

async function deleteItem(req, res){
    try{
        const item = await controller.deleteItem(req.params.id);
        respuesta.success(req, res, 'Facultad eliminada correctamente', 200);
    }
    catch(error) {
        console.log(error); //solo para desarrollo, no dejar en producción
        respuesta.error(req, res, error.message, 404);
    }
}

module.exports = router;