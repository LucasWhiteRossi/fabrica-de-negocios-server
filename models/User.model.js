const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  vinculoPersona: [{type: mongoose.Types.ObjectId, ref: "Persona"}],
  vinculoNegocio: [{type: mongoose.Types.ObjectId, ref: "ModeloNegocio"}],
  isActive: { type: Boolean, default: true },
  disabledOn: { type: Date },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
