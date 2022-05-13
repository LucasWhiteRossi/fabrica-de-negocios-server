const mongoose = require("mongoose")
const Schema = mongoose.Schema

const modeloNegocioSchema = new Schema({


});

const ModeloNegocioModel = mongoose.model("ModeloNegocio", modeloNegocioSchema)

module.exports = ModeloNegocioModel