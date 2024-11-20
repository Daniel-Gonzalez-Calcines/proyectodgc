const db = require('./db')
const helper = require('../helper')
const config = require('../config')
const { Select } = require('@mui/material')

async function insert(data) {
    const query = `INSERT INTO coleccion(nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`;
    const values = [data.nombre, data.marca, data.tipo, data.precio];
    
    const result = await db.query(query, values);
}

module.exports = {
    insert
}