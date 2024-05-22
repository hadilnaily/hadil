const express = require("express");
const router = express.Router();
const CompteModel = require("../models/Comptes");

router.get("/", async (req, res) => {
    try {
        const comptes = await CompteModel.find();
        res.json(comptes);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const compte = new CompteModel({
            nom: req.body.nom,
            Tel: req.body.Tel,
            email: req.body.email,
            adresse: req.body.adresse,
            mot_de_passe: req.body.mot_de_passe
           
        });
        const savedCompte = await compte.save();
        res.status(201).json(savedCompte);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('Bad Request');
    }
});

//UPDATE modifier comptes
router.put('/:id', async (req, res) => {
    try {
        let comptes = await CompteModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comptes) {
            return res.status(404).send('No users with the given ID was found!');
        }
        res.send(comptes);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The users could not be updated!');
    }
});

// DELETE supprimer comptes
router.delete('/:id', async (req, res) => {
    try {
        let comptes = await CompteModel.findByIdAndDelete(req.params.id);
        if (!comptes) {
            return res.status(404).send('No comptes with the given ID was found!');
        }
        res.send(comptes);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The comptes could not be deleted!');
    }
});

module.exports = router;