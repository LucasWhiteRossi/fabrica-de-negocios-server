const express = require('express')
const router = express.Router()
const PersonaModel = require("../models/Persona.model")

const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

/* router.post('/criar-persona', isAuth, attachCurrentUser, async (req, res) => {
    try {

        const novaPersona = await PersonaModel.create(
            { ...req.body }
        )

        return res.status(201).json(novoUsuario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error })
    }
}) */





module.exports = router;
