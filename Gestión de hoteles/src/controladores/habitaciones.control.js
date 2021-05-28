'use strict'
const HabitacionModelo = require("../modelos/habitacion.modelo");
var Habitaciones = require("../modelos/habitacion.modelo");
var bcrypt = require('bcrypt-nodejs');
const { restart } = require("nodemon");
var jwt = require("../servicios/jwt");

function agregarhabitacion(req, res){
    var HabitacionModelo = new Habitaciones();
    var params = req.body;

    if (params.nombre && params.hotel ){
        HabitacionModelo.nombre = params.nombre;
        HabitacionModelo.capadultos = params.capadultos;
        HabitacionModelo.capNiños = params.capNiños;
        HabitacionModelo.habDisponible = params.habDisponible;
        HabitacionModelo.hotel = params.hotel;
       

        Habitaciones.find({
            $or:[
                {nombre: HabitacionModelo.nombre},
               
            ]
        }).exec((error, habitacionEncontrados)=>{
            if(error) res.status(500).send({Mensaje: 'Error en la peticion '})

            if(habitacionEncontrados && habitacionEncontrados.length>= 1){
                return res.status(500).send({Mensaje:'Ya existe este dato'});
            }else{
               

                HabitacionModelo.save((err,habGuardado)=>{
                        if(err) return res.status(500).send({Mensaje:'Error en la peticion '});

                        if (habGuardado){
                            res.status(200).send({habGuardado})
                        }else{
                            res.status(404).send({mensaje: 'No se ha podido guardar los datos :('})
                        }
                    });
                
            }
        })

    }

}

function habitacionHotel (req,res){
  
        var nombre= req.params.hoteles
       
    
        Habitaciones.find({nombre},(err,hoteles)=>{
            if(err) return res.status(500).send({Mensaje: 'Error en la peticon de obtener los datos '})
            if(!hoteles) return restart.status(500).send({Mensaje: 'Puede que  no contenga Datos'})
            return res.status(200).send({hoteles})
        })
    
    

}

module.exports = {
    agregarhabitacion,
     habitacionHotel 

    
}