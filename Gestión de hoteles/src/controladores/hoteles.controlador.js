'use strict'


const hotelModelo = require("../modelos/hoteles.modelo")
var Hotel = require("../modelos/hoteles.modelo")
var bcrypt = require('bcrypt-nodejs');
const { restart } = require("nodemon");
var jwt = require("../servicios/jwt");
const { param } = require("../rutas/hoteles.ruta");


function agregarHotel(req,res){
    var hotelModelo = new Hotel()
    var params = req.body
    if(params.nombre && params.telefono && params.direccion && params.ubicacion){
        hotelModelo.nombre = params.nombre;
        hotelModelo.telefono = params.telefono;
        hotelModelo.direccion= params.direccion;
        hotelModelo.ubicacion = params.ubicacion;
        hotelModelo.adminHotel = params.adminHotel;
        hotelModelo.presioprom = params.presioprom;
        hotelModelo.calificacion = params.calificacion;
        hotelModelo.descripcion = params.descripcion;

        Hotel.find({
            $or:[
                {nombre: params.nombre},
                {adminHotel: params.adminHotel}
            ]
        }).exec((err,hotelEncontrado)=>{
            if(err) res.status(500).send({Mensaje: 'Error en la peticion'})

            if(hotelEncontrado && hotelEncontrado.legth >= 1){
                return res.status(500).send({Mensaje:'El hotel ya existe y el administrador tambien'})
            }else{
                
                hotelModelo.save((err,hotelGuardado)=>{
                    if(err) return res.status(500).send({Mensaje: 'Eror en la peticion de guardar.'})

                    if(hotelGuardado){
                        res.status(200).send({hotelGuardado})

                    }else{
                        res.status(404).send({Mensaje: 'No se a podido guardar el Hotel'})
                    }
                })
            }
        })
        
    }
}

function mostrarHoteles (req,res){
    Hotel.find((err,hoteles)=>{
        if(err) return res.status(500).send({Mensaje: 'Error en la peticon de obtener los datos de este hotel'})
        if(!hoteles) return restart.status(500).send({Mensaje: 'Puede que este hotel no contenga Datos'})
        return res.status(200).send({hoteles})
    })
}
function hotelnombre (req,res){
    var nombre = req.params.nombreHotel
    Hotel.findOne ({nombre },(err,hotel)=>{
        if(err) return res.status(500).send({Mensaje: 'Error en la peticon de obtener los datos de este hotel'})
        if(!hotel) return restart.status(500).send({Mensaje: 'Puede que este hotel no contenga Datos'})
        return res.status(200).send({hotel})
    })
}

function hotelDireccion(req,res){
    var ubicacion = req.params.ubicaHotel
    Hotel.find ({ubicacion },(err,hotel)=>{
        if(err) return res.status(500).send({Mensaje: 'Error en la peticon de obtener los datos de este hotel'})
        if(!hotel) return restart.status(500).send({Mensaje: 'Puede que este hotel no contenga Datos'})
        return res.status(200).send({hotel})
    })
}


 function editarHotel(req,res){
    var idHotel = req.params.id
    var params = req.body

    Hotel.findByIdAndUpdate(idHotel,params,{new:true},(err,hotelActualizado)=>{
        if(err) return res.status(500).send({Mensaje: 'Error en la peticion'})
        if(!hotelActualizado) return res.status(500).send({Mensaje:'No se a podido editar el Hotel'})

        return res.status(200).send({hotelActualizado})
    })

 }

 function eliminarHotel(req,res){
     var idHoteles = req.params.idHotel

    Hotel.findByIdAndDelete(idHoteles,((err,hotelEliminado)=>{
        if(err) return res.status(500).send({Mensaje:'Error en la peticion'})
        if(!hotelEliminado) return res.status(500).send({Mensaje:'No se ha podido eliminar el hotel'})

        return res.status(500).send({ hotelEliminado})
    }))
 }



module.exports = {
    agregarHotel,
    mostrarHoteles,
    hotelnombre,
    hotelDireccion,
    editarHotel,
    eliminarHotel
}