'use strict'
//importaciones
var express = require("express");
var usuarioControlador = require("../controladores/usuario.controlador");

//MIDDLEWARES

var md_autorizacion = require("../middlewares/authenticated");


//rutas
var api = express.Router()
api.get('/ejemplo',usuarioControlador.ejemplo)
api.post('/registrar',usuarioControlador.registrar)
api.get('/obtenerUsuarios', usuarioControlador.obtenerUsuarios)
api.get('/obtenerUsuarioId/:idUsuario',usuarioControlador.obtenerUsuarioId)
api.post('/login',usuarioControlador.login)
api.put('/editarPerfil/:id',md_autorizacion.ensureAuth, usuarioControlador.editarperfil)
api.delete('/eliminarUsuario/:idUsuario', md_autorizacion.ensureAuth, usuarioControlador.eliminarUsuario);

module.exports = api;