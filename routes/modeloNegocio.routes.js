const express = require('express')
const router = express.Router()
const UserModel = require ("../models/User.model")
const ModeloNegocioModel = require("../models/ModeloNegocio.model")

const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

router.post('/criar-negocio', isAuth, attachCurrentUser, async (req, res) => {
    try {

        const novoNegocio = await ModeloNegocioModel.create(
            { ...req.body,
              owner: req.currentUser._id 
            }
        )
        await UserModel.findOneAndUpdate(
            {_id: req.currentUser._id},
            {$push: { vinculoNegocio: novoNegocio._id } },
            {runValidators: true, new: true}
        );

        return res.status(201).json(novaPersona)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error })
    }
});

router.get('/negocios', isAuth, attachCurrentUser, async (req, res) => {
    try{

        const negocios = await ModeloNegocioModel.find({
            owner: req.currentUser._id
        })
        return res.status(200).json(negocios);

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

router.put('/editar-negocio/:negocioId', isAuth, attachCurrentUser, async (req, res) => {
    try {

        const negocioId = req.params.negocioId

        const updateNegocio = await ModeloNegocioModel.findByIdAndUpdate(
            {_id: negocioId},
            {...req.body},
            {runValidators: true, new: true},
        );

        return res.status(200).json(updateNegocio)

    }catch (error){
    return res.status(500).json(error)   
    }
})

router.delete("/deletar-negocio/:negocioId", isAuth, attachCurrentUser, async (req, res) => {
    try {
        
        const negocioId = req.params.negocioId;
        const negocioDeletado = await ModeloNegocioModel.findOneAndDelete({ _id: negocioId })

          await ModeloNegocioModel.findOneAndUpdate(
            {_id: req.currentUser._id},
            {$pull: { vinculoNegocio: negocioDeletado._id } },
            {runValidators: true, new: true}
        );

        return res.status(200).json(negocioDeletado)

    }catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

});


module.exports = router;