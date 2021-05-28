'use strict'

var moongose = require("mongoose");

var Schema = moongose.Schema;

var hotelSchema = Schema({
  nombre: String,
  telefono: Number,
  direccion: String,
  ubicacion: String,
  adminHotel: {type: Schema.ObjectId, ref: 'usuarios' },
  presioprom: Number,
  calificacion:String,
  descripcion: String

  

  

})

module.exports = moongose.model("hoteles", hotelSchema )