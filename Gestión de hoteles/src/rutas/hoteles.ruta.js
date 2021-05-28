'use strict'
//Importaciones
var express = require("express")
var hotelControlador = require("../controladores/hoteles.controlador")

//Middleware

var md_aurizacion = require("../middlewares/authenticated")

//Rutas
var api = express.Router()
api.post('/agregarHotel',hotelControlador.agregarHotel) 
api.get('/obtenerHoteles',hotelControlador.mostrarHoteles)
api.get('/hotelNombre/:nombreHotel', hotelControlador.hotelnombre)
api.get('/direccionHotel/:ubicaHotel',hotelControlador.hotelDireccion)
api.put('/editarHotel/:id',hotelControlador.editarHotel)
api.delete('/eliminarHotel/idHotel', hotelControlador.eliminarHotel)


module.exports = api;

