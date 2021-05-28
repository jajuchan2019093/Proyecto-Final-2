'use strict'

const usuarioModelo = require("../modelos/usuario.model");
var Usuario = require("../modelos/usuario.model");
var bcrypt = require('bcrypt-nodejs');
const { restart } = require("nodemon");
var jwt = require("../servicios/jwt");



function ejemplo(req,res){
    if(req.user.rol=== "ROL_ADMIN"){
    res.status(200).send({mensaje: "Hola soy un ejemplo"})
    }else{
        res.status(400).send({mensaje:'solo el administrador de la app tiene los permisos.'})
    }
}

function registrar(req, res){
    var usuarioModelo = new Usuario();
    var params = req.body;

    if (params.nombres && params.apellidos && params.username && params.email && params.password ){
        usuarioModelo.nombres = params.nombres;
        usuarioModelo.apellidos = params.apellidos;
        usuarioModelo.username = params.username;
        usuarioModelo.email = params.email;
        usuarioModelo.password = params.password;
        usuarioModelo.rol = 'ROL_ADMIN';

        Usuario.find({
            $or:[
                {username: usuarioModelo.username},
                {email:usuarioModelo.email}
            ]
        }).exec((error, usuarioEncontrados)=>{
            if(error) res.status(500).send({Mensaje: 'Error en la peticion de Usuarios'})

            if(usuarioEncontrados && usuarioEncontrados.length>= 1){
                return res.status(500).send({Mensaje:'El usuario ya existe'});
            }else{
                bcrypt.hash(params.password,null,null,(err,passwordEncriptada)=>{
                    usuarioModelo.password = passwordEncriptada;

                    usuarioModelo.save((err,usuarioGuardado)=>{
                        if(err) return res.status(500).send({Mensaje:'Error en la peticion de Guardar Usuario'});

                        if (usuarioGuardado){
                            res.status(200).send({usuarioGuardado})
                        }else{
                            res.status(404).send({mensaje: 'No se ha podido registrar :('})
                        }
                    });
                })
            }
        })

    }

}

function obtenerUsuarios(req,res){
    

    
    Usuario.find((err,usuarios)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion de obtener los usuarios'});
        if(!usuarios) return restart.status(500).send({Mensaje: 'Puede ser que el usuario no contenga Datos.'});
        return res.status(200).send({usuarios})
    })
    
}

function obtenerUsuarioId(req, res){
    var usuarioId = req.params.idUsuario;
      /*
         Usuario.find({_id: variable que contenga el id},(err,UsuarioEncontrado));
         Usuario.find({_id: variables })
        */
    Usuario.findById(usuarioId,(err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({Mensaje: 'Error en la peticion de Usuario'});
        if(!usuarioEncontrado) return res.status(500).send({Mensaje: 'Error al obtener el usuario.'});
        return res.status(200).send({usuarioEncontrado});
       
    })
}

function login(req,res){
    var params = req.body;

    Usuario.findOne({email: params.email}, (err,usuarioEncontrado)=>{
    if(err) return res.status(500).send({mensaje:'Error en la Petición'})

    if(usuarioEncontrado){
        bcrypt.compare(params.password, usuarioEncontrado.password,(err,passwordVerificada) =>{
            if(passwordVerificada){
                if(params.getToken === 'true'){
                    return res.status(200).send({
                        token:jwt.createToken(usuarioEncontrado)
                    })
                }else{
                    usuarioEncontrado.password = undefined;
                    return res.status(200).send({usuarioEncontrado})
                    

                }
            }else{
                return res.status(200).send({mensaje:'El usuario no ha sido identificado'});
            }
        })
    }else{
        return res.status(500).send({mensaje: 'Error al buscar el usuario'})

         }
    })
}

function editarperfil(req, res){
    var idUsuario = req.params.id;
    var params = req.body;

    delete params.password;

    if(idUsuario != req.user.sub ){
        return res.status(500).send({mensaje: 'No posee los permisos para editar ese usuario'});
    }
    Usuario.findByIdAndUpdate(idUsuario, params, {new:true},(err,usuarioActualizado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la petición' });
        if(!usuarioActualizado) return res.status(500).send({mensaje: 'No se a podido editar tu perfil'});

        return res.status(200).send({usuarioActualizado})
    })

}

function eliminarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

  

    Usuario.findByIdAndDelete(idUsuario, ((err, usuarioEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar usuario' });
        if(!usuarioEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el Usuario'});

        return res.status(200).send({ usuarioEliminado })
    }))
}


module.exports = {
    ejemplo,
    registrar,
    obtenerUsuarios,
    obtenerUsuarioId,
    login,
    editarperfil,
    eliminarUsuario
}