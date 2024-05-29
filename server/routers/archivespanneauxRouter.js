const express = require ("express");
const router = express.Router();


const ArchivespanneauModel= require('../models/Archivespanneaux')

router.get("/", async (req, res)=>{
    const archivespanneaux = await ArchivespanneauModel.find();
    res.json(archivespanneaux)
})

//POST ajouter archivespanneaux
router.post('/', async (req, res) => {
    let archivespanneau = new ArchivespanneauModel({
        code_face: req.body.code_face,
        region: req.body.region,
        emplacement: req.body.emplacement,
        type: req.body.type,
        prix: req.body.prix,
        trafic_routier: req.body.trafic_routier,
        photo: req.body.photo,
        cree_a: new Date().toISOString() // Set current date/time as creation date
       
    });

    try {
        archivespanneau = await archivespanneau.save();
        res.send(archivespanneau);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The panneau could not be created!');
    }
});

//UPDATE modifier panneaux
router.put('/:id', async (req, res) => {
    try {
        let archivespanneaux = await ArchivespanneauModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!archivespanneaux) {
            return res.status(404).send('No users with the given ID was found!');
        }
        res.send(archivespanneaux);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The users could not be updated!');
    }
});


// DELETE an archivespanneau
router.delete('/:id', async (req, res) => {
    try {
        let archivespanneaux = await ArchivespanneauModel.findByIdAndDelete(req.params.id);
        if (!archivespanneaux) {
            return res.status(404).send('No archivespanneau with the given ID was found!');
        }
        res.send(archivespanneaux);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The archive panneau could not be deleted!');
    }
});




module.exports= router;