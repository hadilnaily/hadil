const express = require ("express");
const router = express.Router();
const ArchivecompagneModel = require("../models/Archivescompagnes");


router.get("/", async (req, res)=>{
    const archivecompagnes = await ArchivecompagneModel.find();
    res.json(archivecompagnes)
})





//POST ajouter compagnes
router.post('/', async (req, res) => { // Utilisez app.post() au lieu de router.post()  
    let archivecompagne = new ArchivescompagneModel({
       
        nom_annanceur: req.body.nom_annanceur,
        media_vusiel: req.body.media_vusiel,
        date_publication: req.body.date_publication,
        date_retrait: req.body.date_retrait
       
        
    });

    try {
        archivecompagne = await archivecompagne.save();
        res.send(archivecompagne);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The archivecompagnes could not be created!');
    }
});

//UPDATE modifier compagnes
router.put('/:id', async (req, res) => {
    try {
        let archivecompagne = await ArchivecompagneModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!archivecompagne) {
            return res.status(404).send('No users with the given ID was found!');
        }
        res.send(archivecompagne);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The users could not be updated!');
    }
});

// DELETE supprimer archivecompagnes
router.delete('/:id', async (req, res) => {
    try {
        let archivecompagnes = await ArchivecompagneModel.findByIdAndDelete(req.params.id);
        if (!archivecompagnes) {
            return res.status(404).send('No archivecompagnes with the given ID was found!');
        }
        res.send(archivecompagnes);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The archivecompagnes could not be deleted!');
    }
});




module.exports= router;