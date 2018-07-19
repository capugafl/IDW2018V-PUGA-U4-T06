const mongoose = require('mongoose');

let clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
}
});

const clienteModel = mongoose.model('ClienteSchema', clienteSchema, 'Cliente');



module.exports = clienteModel;