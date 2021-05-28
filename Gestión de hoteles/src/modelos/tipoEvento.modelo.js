'use strict'

var moongose = require("mongoose")
var Schema = moongose.Schema

var tipoEventoSchema = Schema ({
    nombre: String,
    descripcion: String

})

module.exports= moongose.model('tipoEventos', tipoEventoSchema)