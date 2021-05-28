'use strict'

var moongose = require("mongoose")
var Schema = moongose.Schema


var EventosSchema = Schema({
    
    fechaInicio: Date,
    fechaTerminacion: Date,
    noPersonas: Number,
    noSala: Number,
    tipoEvento:{type: Schema.ObjectId, ref: 'tipoEventos'} ,
    hotel:{type: Schema.ObjectId, ref:'hoteles'}
    
})

module.exports = moongose.model('eventos',EventosSchema)