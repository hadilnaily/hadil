const mongoose = require("mongoose");

const CompteSchema = new mongoose.Schema({
    nom: {
        type: String,
    },
    Tel: {
        type: String,

    },
    email: {
        type: String,
    },
    adresse: {
        type: String,
    },
    mot_de_passe: {
        type: String,
    }
});

const CompteModel = mongoose.model('comptes', CompteSchema);

module.exports = CompteModel;