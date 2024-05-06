const fs = require('fs');

const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./product.js');
const {url} = require ('../db/database.js');

mongoose.connect(url)
  .then(() => {
    console.log('Conexión a la base de datos exitosa');


    fs.readFile('productos.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        return;
      }
      const productos = JSON.parse(data);
      Product.insertMany(productos)
        .then(() => console.log('Productos cargados exitosamente.'))
        .catch(err => console.error('Error al insertar productos:', err));
    });
  })
  .catch(err => console.error('Error al conectar con MongoDB:', err));

