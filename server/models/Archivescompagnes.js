const mongoose = require ("mongoose");

const ArchivescompagneSchema = new mongoose.Schema({
    photo:{
        type: String,
    },
    nom_annanceur:{
        type: String,
    },  
    media_vusiel:{
        type: String,
    },
    date_publication:{
        type: String,
    },
    date_retrait:{
        type: String,
    }
    
})
const ArchivescompagneModel = mongoose.model('archivescompagnes', ArchivescompagneSchema, 'archivescompagnes');

module.exports = ArchivescompagneModel