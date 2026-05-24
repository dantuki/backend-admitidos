const express = require('express');
const config = require('./config');
const facultades = require('./modulos/facultades/ruta');
const programas = require('./modulos/programas/ruta'); 
const personas = require('./modulos/personas/ruta');
const usuarios = require('./modulos/usuarios/ruta');
const periodos = require('./modulos/periodos/ruta');
const admisiones = require('./modulos/admisiones/ruta');
const matriculas = require('./modulos/matriculas/ruta');
// 1. Importamos el último módulo: notas
const notas = require('./modulos/notas/ruta');
const respuestas = require('./red/respuestas');

const app = express();

app.set('port', config.app.port);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 2. Rutas del API
app.use('/api/facultades', facultades);
app.use('/api/programas', programas);
app.use('/api/personas', personas);
app.use('/api/usuarios', usuarios);
app.use('/api/periodos', periodos);
app.use('/api/admisiones', admisiones);
app.use('/api/matriculas', matriculas);
// Nueva ruta de notas conectada
app.use('/api/notas', notas); 

// Rutas de prueba
app.get("/", (req, res) => {
    respuestas.success(req, res, "Hello World", 200);
});

app.get("/api/", (req, res) => {
    respuestas.success(req, res, "Hello API", 200);
});

module.exports = app;