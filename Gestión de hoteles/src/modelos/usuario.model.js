'use strict'
 
var moongose = require("mongoose");
var Schema = moongose.Schema;

var UsuarioSchema = Schema({
    nombres: String,
    apellidos: String,
    username: String,
    email: String,
    password: String,
    rol: String


})

module.exports = moongose.model("usuarios", UsuarioSchema)