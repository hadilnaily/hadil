const mongoose = require ("mongoose");

const ArchivespanneauSchema = new mongoose.Schema({
    code_face:{
        type: String,
    },
    region:{
        type: String,
    },
    emplacement:{
        type: String,
    },
    type:{
        type: String,
    },
    prix:{
        type: String,
    },
    trafic_routier:{
        type: Number,
    },
    photo:{
        type: String,
    },
    cree_a: {
        type:String,
    }
})

//const PanneauModel = mongoose.model('panneaux', PanneauSchema)
const ArchivespanneauModel = mongoose.model('archivespanneaux', ArchivespanneauSchema, 'archivespanneaux');

module.exports = ArchivespanneauModel