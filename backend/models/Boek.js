let mongoose = require('mongoose');

let BoekSchema = new mongoose.Schema({
    WerkID:String,
    BKBBNummer:String, 
    Titel:String,
    Editie:String,
    Leeftijd:String,
    ISBN: String,
    JaarVanUitgave: String,
    TaalPublicatie:String,
    SoortMateriaal:String
   // Gereserveerd: Boolean
});

mongoose.model("Boek", BoekSchema);