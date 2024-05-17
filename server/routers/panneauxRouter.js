const express = require ("express");
const router = express.Router();


const PanneauModel= require('../models/Panneaux')

router.get("/", async (req, res)=>{
    const panneaux = await PanneauModel.find();
    res.json(panneaux)
})


//POST ajouter panneaux
router.post('/', async (req, res) => {
    let panneau = new PanneauModel({
        code_face: req.body.code_face,
        zone: req.body.zone,
        region: req.body.region,
        emplacement: req.body.emplacement,
        regie: req.body.regie,
        type: req.body.type,
        face: req.body.face,
        eclairage: req.body.eclairage,
        visibilite: req.body.visibilite,
        metrage: req.body.metrage,
        prix: req.body.prix,
        trafic_routier: req.body.trafic_routier,
        photo: req.body.photo,
        position_x: req.body.position_x,
        position_y: req.body.position_y,
        
        cree_a: new Date().toISOString(), // Set current date/time as creation date
        mis_a_jour_a: null // No update date initially
    });

    try {
        panneau = await panneau.save();
        res.send(panneau);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The panneau could not be created!');
    }
});

//UPDATE modifier panneaux
router.put('/:id', async (req, res) => {
    try {
        let panneaux = await PanneauModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!panneaux) {
            return res.status(404).send('No users with the given ID was found!');
        }
        res.send(panneaux);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The users could not be updated!');
    }
});

// DELETE supprimer panneaux
router.delete('/:id', async (req, res) => {
    try {
        let panneaux = await PanneauModel.findByIdAndDelete(req.params.id);
        if (!panneaux) {
            return res.status(404).send('No panneau with the given ID was found!');
        }
        res.send(panneaux);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The panneau could not be deleted!');
    }
});



module.exports= router;
