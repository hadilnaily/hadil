const express = require ("express");
const router = express.Router();
const CompagneModel = require('../models/Compagnes')


router.get("/", async (req, res)=>{
    const compagnes = await CompagneModel.find();
    res.json(compagnes)
})


router.get('/nom_annanceur/:nom_annanceur', async (req, res) => {
    try {
        const compagne = await CompagneModel.findOne({ nom_annanceur: req.params.nom_annanceur });
        if (!compagne) {
            return res.status(404).json({ message: 'The compagne with the given nom_annanceur was not found.' });
        }
        res.status(200).json(compagne);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/type_publication/:type_publication', async (req, res) => {
    try {
        const compagne = await CompagneModel.findOne({ type_publication: req.params.type_publication });
        if (!compagne) {
            return res.status(404).json({ message: 'The compagne with the given type_publication was not found.' });
        }
        res.status(200).json(compagne);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//POST ajouter compagnes
router.post('/', async (req, res) => { // Utilisez app.post() au lieu de router.post()  
    let compagne = new CompagneModel({
        nom_annanceur: req.body.nom_annanceur,
        type_publication: req.body.type_publication,
        date_publication: req.body.date_publication,
        date_retrait: req.body.date_retrait,
        media_vusiel: req.body.media_vusiel,
        cree_a: new Date().toISOString(), // Set current date/time as creation date
        mis_a_jour_a: null // No update date initially
    });

    try {
        compagne = await compagne.save();
        res.send(compagne);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The panneau could not be created!');
    }
});

//UPDATE modifier compagnes
router.put('/:id', async (req, res) => {
    try {
        let compagne = await CompagneModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!compagne) {
            return res.status(404).send('No users with the given ID was found!');
        }
        res.send(compagne);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The users could not be updated!');
    }
});

// DELETE supprimer compagnes
router.delete('/:id', async (req, res) => {
    try {
        let compagnes = await CompagneModel.findByIdAndDelete(req.params.id);
        if (!compagnes) {
            return res.status(404).send('No compagnes with the given ID was found!');
        }
        res.send(compagnes);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send('The compagnes could not be deleted!');
    }
});


// Get only nom_annanceur
router.get('/onlynom_annanceur', async (req, res) => {
    try {
      const compagnes = await CompagneModel.find({}, 'nom_annanceur');
      res.json(compagnes);
    } catch (error) {
      console.error('Erreur :', error);
      res.status(500).json({ error: 'Erreur Interne du Serveur' });
    }
  });
  
  // Get only type_publication
  router.get('/onlytype_publication', async (req, res) => {
    try {
      const compagnes = await CompagneModel.find({}, 'type_publication');
      res.json(compagnes);
    } catch (error) {
      console.error('Erreur :', error);
      res.status(500).json({ error: 'Erreur Interne du Serveur' });
    }
  });

module.exports= router;
