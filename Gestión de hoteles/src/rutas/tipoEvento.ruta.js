'use strict'

const { Router } = require("express")
//Importaciones
var express = require("express")
var tipoEventoControlador = require("../controladores/tipoEvento.controlador")


//Middleware
var md_autorizacion = require("../middlewares/authenticated")

//Rutas
var api = express.Router()
api.post('/agregarTipoEvento', tipoEventoControlador.agregarTipoEvento)
api.get('/obtenerTipoEvento', tipoEventoControlador.obtenerTipoEvento)
api.put('/editarTipoEvento/:id', tipoEventoControlador.editarTipoEvento)
api.delete('/eliminarTipoEvento/:idTipoEvento',tipoEventoControlador.eliminarTipoEvento)

/*
Nota para mi, esto se usa cuando se necesitan los permisos de un cliente, admin o usuario comun
md_autorizacion.ensureAuth
*/
module.exports = api;

