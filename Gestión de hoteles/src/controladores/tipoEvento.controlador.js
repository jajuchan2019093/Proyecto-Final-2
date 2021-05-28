'use strict'

const tipoEventoModelo = require("../modelos/tipoEvento.modelo")
var tipoEvento = require("../modelos/tipoEvento.modelo")
var bcrypt = require('bcrypt-nodejs')
const { restart } = require("nodemon")
var jwt = require("../servicios/jwt")



function agregarTipoEvento(req,res){
    var tipoEventoModelo = new tipoEvento();
    var params = req.body;

    if(params.nombre && params.descripcion){
        tipoEventoModelo.nombre = params.nombre;
        tipoEventoModelo.descripcion = params.descripcion;

        tipoEvento.find({
            $or:[
                {nombre: tipoEventoModelo.nombre},
                {descripcion: tipoEventoModelo.descripcion}
            ]
        }).exec((err,tipoEventoEncontrado)=>{
            if(err) res.status(500).send({Mensaje: 'Hubo un error en su petición.'})

            if(tipoEventoEncontrado && tipoEventoEncontrado.length >= 1){
                return res.status(500).send({Mensaje: 'El tipo de Evento ya existe.'})
            }else{
                tipoEventoModelo.save((err,tipoEventoGuardado)=>{
                    if(err) return res.status(500).send({Mensaje: 'Error al guardar el Tipo de Evento :('})

                    if(tipoEventoGuardado){
                        res.status(200).send({tipoEventoGuardado})
                    }else{
                        res.status(404).send({Mensaje: 'No se a podido guardar el Tipo de Evento '})
                    }
                })
            }
        })

    }

  

}

function obtenerTipoEvento(req,res){
    tipoEvento.find((err,tipoEventos)=>{
        if(err) return res.status(500).send({Mensaje:'Error en la peticion de obtener los Tipos de Eventos'})
        if(!tipoEventos) return restart.status(500).send({Mensaje: 'Puede ser que el Tipo de Evento no contenga  datos :('})
        return res.status(200).send({tipoEventos})
    })

}

function editarTipoEvento(req,res){
    var idTipoEvento = req.params.id;
    var params = req.body;

    delete params.password;
    
    tipoEvento.findByIdAndUpdate(idTipoEvento, params, {new:true},(err,tipoEventoActualizado)=>{
        if(err) return res.status(500).send({Mensaje: 'Error en su petición.'})
        if(!tipoEventoActualizado) return res.status(500).send({Mensaje: 'No se a podido editar el Tipo de Evento'})

        return res.status(200).send({tipoEventoActualizado})
    })

}

function eliminarTipoEvento(req,res){
    var idTipoEvento = req.params.idTipoEvento

        tipoEvento.findByIdAndDelete(idTipoEvento,((err, tipoEventoEliminado)=>{
            if(err) return res.status(500).send({Mensaje:'Error en la petición de eliminar el Tipo de Evento'})
            if(!tipoEventoEliminado) return res.status(500).send({Mensaje: 'Hubo un error al intenta eliminar el Tipo de Evento'})

            return res.status(200).send({ tipoEventoEliminado})
        }))

}


module.exports = {
    agregarTipoEvento,
    obtenerTipoEvento,
    editarTipoEvento,
    eliminarTipoEvento

}
