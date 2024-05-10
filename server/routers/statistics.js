const express = require("express");
const router = express.Router();
const PanneauModel = require('../models/Panneaux');
const CompagneModel = require('../models/Compagnes');
const PrixModel = require("../models/Prix");


router.get("/", async (req, res) => {
    try {
        const panneaux = await PanneauModel.find();
        const compagnes = await CompagneModel.find();
        const prix = await PrixModel.find();

        const panneauxCountByRegion = {};
        panneaux.forEach((panneau) => {
            const region = panneau.region;
            if (!panneauxCountByRegion[region]) {
                panneauxCountByRegion[region] = 1;
            } else {
                panneauxCountByRegion[region]++;
            }
        });

        const compagnesCountByNom_annanceur = {};
        compagnes.forEach((compagne) => {
            const nom_annanceur = compagne.nom_annanceur;
            if (!compagnesCountByNom_annanceur[nom_annanceur]) {
                compagnesCountByNom_annanceur[nom_annanceur] = 1;
            } else {
                compagnesCountByNom_annanceur[nom_annanceur]++;
            }
        });

        const prixCountByPromo = {};
        prix.forEach((prix) => {
            const promo = prix.promo;
            if (!prixCountByPromo[promo]) {
                prixCountByPromo[promo] = 1;
            } else {
                prixCountByPromo[promo]++;
            }
        });

        console.log("Number of panneaux by region:", panneauxCountByRegion);
        console.log("Number of compagnes by nom_annanceur:", compagnesCountByNom_annanceur);
        console.log("Number of prix by promo:", prixCountByPromo);

        res.json({
            panneauxByRegion: panneauxCountByRegion,
            compagnesByNom_annanceur: compagnesCountByNom_annanceur,
            prixByPromo: prixCountByPromo,
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;