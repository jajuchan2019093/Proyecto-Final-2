'use strict'
//Importaciones
var express = require("express")
var hobitacionControlador = require("../controladores/habitaciones.control")

//Middleware

var md_aurizacion = require("../middlewares/authenticated")

//Rutas
var api = express.Router()
api.post('/agregarhabitacion', hobitacionControlador.agregarhabitacion)
api.get('/habitacionHotel/:hoteles',hobitacionControlador.habitacionHotel)



module.exports = api;