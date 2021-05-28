'use strict'

const eventosModelo = require("../modelos/eventos.modelo")
var Eventos = require("../modelos/eventos.modelo")
var bcrypt = require('bcrypt-nodejs')
const { restart } = require("nodemon")
var jwt = require("../servicios/jwt")
const { param } = require("../rutas/usuario.ruta")
var tipoEvento = require("../modelos/tipoEvento.modelo")

function agregarEvento(req,res){
    var eventosModelo = new Eventos()
    var params = req.body

    if(params.tipoEvento && params.fechaInicio && params.fechaTerminacion && params.noPersonas && params.noSala){
      
        eventosModelo.fechaInicio = params.fechaInicio;
        eventosModelo.fechaTerminacion = params.fechaTerminacion;
        eventosModelo.noPersonas = params.noPersonas;
        eventosModelo.noSala = params.noSala;
        eventosModelo.tipoEvento = params.tipoEvento;
        eventosModelo.hotel = params.hotel;

        Eventos.find({
            $or:[
                {fechaInicio: eventosModelo.fechaInicio},
                {fechaTerminacion: eventosModelo.fechaTerminacion},
                {noSala: eventosModelo.noSala }
            ]

        }).exec((err, eventoEncontrado)=>{
            if(err) req.status(500).send({Mensaje: 'Error en la petición del Evento. '})

            if(eventoEncontrado && eventoEncontrado.length >= 1){
                return res.status(500).send({Mensaje: 'La Fecha y la Sala ya estan ocupados.'})
            }else{
                eventosModelo.save((err, eventoGuardado)=>{
                    if(err) return res.status(500).send({Mensaje: 'Error al Guardar el Evento'})

                    if(eventoGuardado){
                        res.status(200).send({eventoGuardado})
                    }else{
                        res.status(404).send({Mensaje: 'No se puedo guardar el evento.'})
                    }
                })
            }

        })
    }

}

function obtenerEvento(req,res){
    Eventos.find({},function(err,eventos ){
        
           
            if(err) return res.status(500).send({Mensaje: 'Error en la peticion de obtener los Eventos.'})
            if(!eventos) return restart.status(500).send({Mensaje: 'Puede que el Evento no tenga datos.'})
            return  res.status(200).send( eventos )
        
       
    })

}
/*
 if(err) return res.status(500).send({Mensaje: 'Error en la peticion de obtener los Eventos.'})
            if(!eventos) return restart.status(500).send({Mensaje: 'Puede que el Evento no tenga datos.'})
*/

function editarEvento(req,res){
    var idEvento = req.params.id
    var params = req.body;
    
    Eventos.findByIdAndUpdate(idEvento, params,{new:true},(err,eventoActualizado)=>{
        if(err) return res.status(500).send({Mensaje: 'Error en la petición'})
        if(!eventoActualizado) return res.status(500).send({Mensaje: 'No se a podido editar el Evento'})
        return res.status(200).send({eventoActualizado})
    })




}

function eliminarEvento(req,res){
    var idEvento = req.params.idEvento

    Eventos.findByIdAndDelete(idEvento,((err, eventoEliminado)=>{
        if(err) return res.status(500).send({Mensaje:'Eror en la petición'})
        if(!eventoEliminado) return res.status(500).send({Mensaje: 'Error al eliminar el Usuario'})

        return res.status(200).send({ eventoEliminado })
    }))
}

function eventosHoteles (req,res){
    var hotel = req.params.eventosHotel

    Eventos.find({hotel},(err,eventoHotel)=>{
        if(err) return res.status(500).send({Mensaje: 'Error en la peticon de obtener los datos de este hotel'})
        if(!eventoHotel) return restart.status(500).send({Mensaje: 'Puede que este hotel no contenga Datos'})
        return res.status(200).send({eventoHotel})
    })

}


module.exports = {
    agregarEvento,
    obtenerEvento,
    editarEvento,
    eliminarEvento,
    eventosHoteles
}