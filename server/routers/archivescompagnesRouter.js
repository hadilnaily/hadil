const express = require ("express");
const router = express.Router();
const CompagneModel = require('../models/Archivescompagnes');
const ArchivescompagneModel = require("../models/Archivescompagnes");


router.get("/", async (req, res)=>{
    const archivescompagnes = await ArchivescompagneModel.find();
    res.json(archivescompagnes)
})





//POST ajouter compagnes
router.post('/', async (req, res) => { // Utilisez app.post() au lieu de router.post()  
    let archivescompagne = new CompagneModel({
        photo: req.body.photo,
        nom_annanceur: req.body.nom_annanceur,
        media_vusiel: req.body.media_vusiel,
        date_publication: req.body.date_publication,
        date_retrait: req.body.date_retrait
       
        
    });

    try {
        archivescompagne = await archivescompagne.save();
        res.send(archivescompagne);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The archivescompagnes could not be created!');
    }
});

//UPDATE modifier compagnes
router.put('/:id', async (req, res) => {
    try {
        let archivescompagne = await archivescompagneModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!archivescompagne) {
            return res.status(404).send('No users with the given ID was found!');
        }
        res.send(archivescompagne);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The users could not be updated!');
    }
});

// DELETE supprimer archivescompagnes
router.delete('/:id', async (req, res) => {
    try {
        let archivescompagnes = await archivescompagneModel.findByIdAndDelete(req.params.id);
        if (!archivescompagnes) {
            return res.status(404).send('No archivescompagnes with the given ID was found!');
        }
        res.send(archivescompagnes);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The archivescompagnes could not be deleted!');
    }
});




module.exports= router;