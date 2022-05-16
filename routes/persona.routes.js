const express = require('express')
const router = express.Router()
const UserModel = require ("../models/User.model")
const PersonaModel = require("../models/Persona.model")
const ModeloNegocioModel = require("../models/ModeloNegocio.model")


const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

router.post('/criar-persona', isAuth, attachCurrentUser, async (req, res) => {
    try {

        const novaPersona = await PersonaModel.create(
            { ...req.body,
              owner: req.currentUser._id 
            }
        )
        await UserModel.findOneAndUpdate(
            {_id: req.currentUser._id},
            {$push: { vinculoPersona: novaPersona._id } },
            {runValidators: true, new: true}
        );

        return res.status(201).json(novaPersona)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error })
    }
});


router.post('/criar-persona/:negocioId', isAuth, attachCurrentUser, async (req, res) => {
    try {
        const negocioId = req.params.negocioId 
        const novaPersona = await PersonaModel.create(
            { ...req.body,
              owner: req.currentUser._id,
              vinculoNegocio: negocioId
            }
        )

        await UserModel.findOneAndUpdate(
            {_id: req.currentUser._id},
            {$push: { vinculoPersona: novaPersona._id } },
            {runValidators: true, new: true}
        );

        await ModeloNegocioModel.findOneAndUpdate(
            {_id: negocioId},
            {$push: { vinculoNegocio: novaPersona._id } },
            {runValidators: true, new: true}
        );

        return res.status(201).json(novaPersona)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error })
    }
});

router.get('/personas', isAuth, attachCurrentUser, async (req, res) => {
    try{

        const personas = await PersonaModel.find({
            owner: req.currentUser._id
        })
        return res.status(200).json(personas);

    } catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
});

router.get('/personas/:personaId', isAuth, attachCurrentUser, async (req, res) => {
    try{

        const personaId = req.params.personaId
        const persona = await PersonaModel.findOne({
           _id: personaId,
           owner: req.currentUser._id 
        })

        return res.status(200).json(persona);


    }catch(error){
    return res.status(500).json(error)
    }
});

router.put('/editar-persona/:personaId', isAuth, attachCurrentUser, async (req, res) => {
    try {

        const personaId = req.params.personaId

        const updatePersona = await PersonaModel.findByIdAndUpdate(
            {_id: personaId},
            {...req.body},
            {runValidators: true, new: true},
        );

        return res.status(200).json(updatePersona)

    }catch (error){
    return res.status(500).json(error)   
    }
})

router.patch('/desvincular-persona/:personaId/:negocioId', isAuth, attachCurrentUser, async (req, res) => {
    try {

        const personaId = req.params.personaId
        const negocioId = req.params.negocioId

        const updatePersona = await PersonaModel.findByIdAndUpdate(
            {_id: personaId},
            {vinculoNegocio: null },
            {runValidators: true, new: true},
        );

        await ModeloNegocioModel.findOneAndUpdate(
            {_id: req.currentUser._id},
            {$pull: { vinculoPersona: personaDeletada._id } },
            {runValidators: true, new: true}
        );

        return res.status(200).json(updatePersona)

    }catch (error){
    return res.status(500).json(error)   
    }
})

router.delete("/deletar-persona/:personaId", isAuth, attachCurrentUser, async (req, res) => {
    try {
        
        const personaId = req.params.personaId;
        const personaDeletada = await PersonaModel.findOneAndDelete({ _id: personaId })

          await PersonaModel.findOneAndUpdate(
            {_id: req.currentUser._id},
            {$pull: { vinculoPersona: personaDeletada._id } },
            {runValidators: true, new: true}
        );

        return res.status(200).json(personaDeletada)

    }catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

});


module.exports = router;
