// CREATE SERVER
const express = require ("express");
const bodyParser = require ("body-parser");
const cors = require('cors');
const app = express();
app.use(cors()); // enable CORS for all routes



//CONNECT TO DB
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://nailyhadil1999:2A35RiwovffUCkaE@cluster0.7rzef4v.mongodb.net/mernproject?retryWrites=true&w=majority")

//IMPORT PANNEAU MODEL
const PanneauModel = require('./models/Panneaux')

//IMPORT COMPAGNES MODEL
const CompagneModel = require('./models/Compagnes')

//IMPORT PRIX MODEL
const PrixModel = require('./models/Prix')

//IMPORT ARCHIVES MODEL
const ArchiveModel = require('./models/Archives')

//IMPORT USERS MODEL
const UserModel = require('./models/Users')

//IMPORT ADministrateurs MODEL
const AdministrateurModel = require('./models/Administrateurs')

//IMPORT contact MODEL
const ContactModel = require('./models/Contacts')




const getPanneaux = require ('./routers/panneauxRouter');
app.use('/panneaux',getPanneaux)

const getCampagnes = require ('./routers/campagnesRouter');
app.use('/compagnes',getCampagnes)

const getPrix = require ('./routers/prixRouter');
app.use('/prix',getPrix)

const getArchives = require ('./routers/archivesRouter');
app.use('/archives',getArchives)

const getUsers = require ('./routers/usersRouter');
app.use('/users',getUsers)

const getAdministrateurs = require ('./routers/administrateursRouter');
app.use('/administrateurs',getAdministrateurs)


const getContacts = require ('./routers/contactsRouter');
app.use('/contacts',getContacts)

const getStatistic = require ('./routers/statistics');
app.use('/statistic',getStatistic)




app.listen("3001", ()=>{
    console.log("hello hadil hi")
})