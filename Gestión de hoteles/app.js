'use strict'

//variables globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors')

//importacion de rutas
var usuario_rutas = require("./src/rutas/usuario.ruta")
var tipoEvento_rutas = require("./src/rutas/tipoEvento.ruta")
var evento_rutas = require("./src/rutas/evento.ruta")
var hotel_rutas = require("./src/rutas/hoteles.ruta")
var habitacion_rutas = require("./src/rutas/habtacion.ruta")

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cabezeras
app.use(cors());                         



//aplicacion de rutas
app.use('/api', usuario_rutas, tipoEvento_rutas,evento_rutas,hotel_rutas,habitacion_rutas)


//exportar
module.exports = app;