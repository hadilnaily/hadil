const express = require("express");
const router = express.Router();
const PanneauModel = require('../models/Panneaux');
const CompagneModel = require('../models/Compagnes');
const PrixModel = require("../models/Prix");
const ArchivecompagneModel = require("../models/Archivescompagnes");

router.get("/", async (req, res) => {
    try {
        const panneaux = await PanneauModel.find();
        const compagnes = await CompagneModel.find();
        const prix = await PrixModel.find();
        const archivecompagnes = await ArchivecompagneModel.find();

        const panneauxCountByType = {};
        const panneauxCountByRegionAndTrafic = {};
        const compagnesCountByMediaVisuel = {
            image: 0,
            video: 0
        };
        const archivedCompagnesCount = archivecompagnes.length;

        // Comptage des archivecompagnes par annonceur
        const archivedCompagnesByNomAnnanceur = await ArchivecompagneModel.aggregate([
            { $group: { _id: "$nom_annanceur", count: { $sum: 1 } } }
        ]);

        panneaux.forEach((panneau) => {
            // Comptage par type
            const type = panneau.type;
            if (!panneauxCountByType[type]) {
                panneauxCountByType[type] = 1;
            } else {
                panneauxCountByType[type]++;
            }

            // Comptage par région et trafic routier
            const region = panneau.region;
            const trafic_routier = panneau.trafic_routier;

            if (!panneauxCountByRegionAndTrafic[region]) {
                panneauxCountByRegionAndTrafic[region] = {};
            }

            if (!panneauxCountByRegionAndTrafic[region][trafic_routier]) {
                panneauxCountByRegionAndTrafic[region][trafic_routier] = 1;
            } else {
                panneauxCountByRegionAndTrafic[region][trafic_routier]++;
            }
        });

        compagnes.forEach((compagne) => {
            // Comptage par media
            const media_vusiel = compagne.media_vusiel;
            if (media_vusiel.endsWith('.png') || media_vusiel.endsWith('.jpg')) {
                compagnesCountByMediaVisuel.image++;
            } else if (media_vusiel.endsWith('.mp4')) {
                compagnesCountByMediaVisuel.video++;
            }
        });

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
        console.log("Number of panneaux by type:", panneauxCountByType);
        console.log("Number of panneaux by region and trafic_routier:", panneauxCountByRegionAndTrafic);
        console.log("Number of compagnes by media_visuel:", compagnesCountByMediaVisuel);

        res.json({
            panneauxByRegion: panneauxCountByRegion,
            compagnesByNom_annanceur: compagnesCountByNom_annanceur,
            prixByPromo: prixCountByPromo,
            panneauxByType: panneauxCountByType,
            panneauxByRegionAndTrafic: panneauxCountByRegionAndTrafic,
            compagnesByMediaVisuel: compagnesCountByMediaVisuel,
            archivedCompagnesCount: archivedCompagnesCount,
            archivedCompagnesByNomAnnanceur: archivedCompagnesByNomAnnanceur
        });
    } catch (error) {
        console.error("Error while fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
