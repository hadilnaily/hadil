const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    nom: {
        type: String,
    },
    email: {
        type: String,
    },
    Telephone: {
        type: String,

    },
    sujet: {
        type: String,
    },
    message: {
        type: String,
    },
    emetteur: {
        type: String,
    },
    recepteur: {
        type: String,
    },
    date_envoi: {
        type:String,
    }
});

const ContactModel = mongoose.model('contacts', ContactSchema);

module.exports = ContactModel;