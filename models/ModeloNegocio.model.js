const mongoose = require("mongoose")
const Schema = mongoose.Schema

const modeloNegocioSchema = new Schema({
    owner:  {type: mongoose.Types.ObjectId, ref: "User", required:true},
    vinculoNegocio:  {type: mongoose.Types.ObjectId, ref: "ModeloNegocio"},
    questionarioNegocio: {}

});

const ModeloNegocioModel = mongoose.model("ModeloNegocio", modeloNegocioSchema)

module.exports = ModeloNegocioModel