const mongoose = require("mongoose")
const Schema = mongoose.Schema

const modeloNegocioSchema = new Schema({
    owner:  {type: mongoose.Types.ObjectId, ref: "User", required:true},
    vinculoPersona: [{type: mongoose.Types.ObjectId, ref: "Persona"}],
    beneficio: { type: String },
    solucao: { type: String },
    produtos: { type: String },
    necessidades: { type: String },
    solucaoValor: { type: String },
    clientes: { type: String },
    canais: { type: String },
    contatos: { type: String },
    contatosEstabelecidos: { type: String },
    custoRelacionamento: { type: String },
    relacionamentoEficiente: { type: String },
    relacionamentoRotina: { type: String },
    entrega: { type: String },
    tipoEntrega: { type: String },
    clientePronto: { type: String },
    pagamento: { type: String },
    maiorLucro: { type: String },
    menorLucro: { type: String },
    atividades: { type: String },
    outrasAtividades: { type: String },
    recursos: { type: String },
    outrosRecursos: { type: String },
    parceiros: { type: String },
    fornecedores: { type: String },
    recursosParceiros: { type: String },
    atividadesParceiros: { type: String },
    custoRelevante: { type: String },
    tipoRecurso: { type: String },
    despesasAtividades: { type: String },
});

const ModeloNegocioModel = mongoose.model("ModeloNegocio", modeloNegocioSchema)

module.exports = ModeloNegocioModel