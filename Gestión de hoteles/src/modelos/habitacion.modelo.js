'use strict'

var moongose = require("mongoose")
var Schema = moongose.Schema


var HabitacionSchema = Schema({
    
   nombre: String,
   capadultos: String,
   capNiños: String,
    habDisponible : Number,
    hotel:{type: Schema.ObjectId, ref:'hoteles'}
    
})

module.exports = moongose.model('habitaciones',HabitacionSchema)