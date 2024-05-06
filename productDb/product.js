const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number, 
        unique: true, 
        required: true 
    },
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: false
    },
    imageURL: {
        type: Array,
        required: false
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

