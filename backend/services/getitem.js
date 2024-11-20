const db = require('./db')
const helper = require('../helper')
const config = require('../config')
const { Select } = require('@mui/material')

async function getitem() {
    const query = `SELECT * FROM coleccion`;
    
    const result = await db.query(query);

    return {
        result
    }
}

module.exports = {
    getitem
}