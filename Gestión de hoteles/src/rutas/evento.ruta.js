'use strict'

//Importaciones
var express = require("express")
var eventosControlador = require("../controladores/eventos.controlador")
//middlewares

var md_autorizacion = require("../middlewares/authenticated")

//Rutas
var api = express.Router()
api.post('/agregarEvento',eventosControlador.agregarEvento )
api.get('/obtenerEvento', eventosControlador.obtenerEvento)
api.put('/editarEvento/:id',eventosControlador.editarEvento)
api.delete('/eliminarEvento/:idEvento', eventosControlador.eliminarEvento)
api.get('/eventosHoteles/:eventosHotel',eventosControlador.eventosHoteles)

module.exports = api