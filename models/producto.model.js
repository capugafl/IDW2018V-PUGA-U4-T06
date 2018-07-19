const mongoose = require('mongoose');

let productoSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: true
}, 
  precio:{
    type: String,
    required: true
  }
});

const ProductoModel = mongoose.model('ProductoSchema', productoSchema, 'Producto');



module.exports = productoModel;