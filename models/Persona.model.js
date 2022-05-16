const mongoose = require("mongoose")
const Schema = mongoose.Schema

const personaSchema = new Schema({
    owner:  {type: mongoose.Types.ObjectId, ref: "User", required:true},
    vinculoNegocio: {type: mongoose.Types.ObjectId, ref: "ModeloNegocio"},
    nome: { type: String },
    idade: { type: Number},
    declarado: { type: String, enum: ["heterossexual", "lésbica", "gay", "bissexual", "transexual", "travesti", "transgênero", "queer", "intersexo", "assexual", "agênero", "arromântico", "pansexual", "outros"] },
    vestimenta: { type: String },
    identificacao: { type: String },
    escolaridade: { type: String },
    filhos: { type: String },
    "moradia-caracteristicas": { type: String },
    hobby: { type: String },
    ocupacao: { type: String },
    renda: { type: String, enum: ["Não possue renda", "Até R$ 1.500,00", "De R$ 1.500,00 até R$ 5.000,00", "De R$ 5.000,00 até R$10.000,00", "Acima de R$ 10.000,00" ] },
    historia: { type: String },
    "local-compras": { type: String, enum: ["loja virtual", "loja física"]},
    comportamento: { type: String },
    "lojas-preferidas": { type: String },
    influenciador: { type: String },
    "influenciadores-famosos": { type: String },
    pesquisa: { type: String },
    "meio-comunicacao": { type: String },
    desafios: { type: String },
    objecoes: { type: String },
    oportunidades: { type: String },
    "papel-persona": { type: String },	

});

const PersonaModel = mongoose.model("Persona", personaSchema)

module.exports = PersonaModel