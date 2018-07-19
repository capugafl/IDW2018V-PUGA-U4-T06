const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');

// var async = require('async');

let _cliente;

const getAll = (req, res) => {
    _cliente.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'Clientes', res));
};

const getById = (req, res) => {
    const id = req.params.id;

    if(id.toString().length!=24){
        res.status(400);
        res.json({err:"Identificador inválido"});
    }
    else{
    _cliente.find({_id:id})
        .sort({})
        .exec(handler.handleMany.bind(null, 'Cliente', res));
    }
};

const deleteById = (req, res) => {
    
    const id = req.params.id;

  _cliente.remove({_id:id}, (err,data)=>{
      if(err){
          res.status(400);
          res.json({msg:"No se pudo realizar la operación, intente nuevamente"});
      }else{
          res.status(200);
          res.json({msg:"El cliente se eliminó correctamente"});
      }
  });

 
};

const createCliente = (req, res) => {
    const cliente = req.body;
    
    _cliente.create(cliente)
    .then(
        (data) =>{
            res.status(200);
            res.json({msg:"Cliente creado correctamente",data:data});
        }
    )
    .catch(
        (err)=>{
            rest.status(400);
            rest.json({msg:"Algo va mal!!!",data:err});
        }
    )
};

const updateById = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = {_id:id};
    
    _cliente.findOneAndUpdate(query, newData, (err,data)=>{
        if(err){
            res.status(400);
            res.json({msg:"No se pudo realizar la operación, intente nuevamente"});
        }else{
            res.status(200);
            res.json({msg:"El cliente se eliminó correctamente"});
        }
    });

};

const getByName = (req, res) => {
    const id = req.params.id;
    const nombre = req.params.nombre;

    _user.find({_id:id,nombre:nombre})
        .sort({})
        .exec((error,doc)=>{
            if(error){
                res.status(200);
                res.json({Error:"Cliente Invalido"})
            }
            else{
                if(doc.length==0){
                    res.status(400);
                    res.json({Error:"No se econtro"})
                }
                else{
                    res.status(200);
                    res.json({User:"Cliente Valido",doc})
                }
            }
        });
    
};


module.exports = (Cliente) => {
    _cliente = Cliente;
    return ({
        getAll,
        getById,
        deleteById,
        createCliente,
        updateById,
        getByName
    });
}