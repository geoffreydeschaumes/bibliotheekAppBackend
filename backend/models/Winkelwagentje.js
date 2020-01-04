let mongoose = require('mongoose');

let WinkelwagenSchema = new mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User'
    },
    boeken:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Boek'
      }
    ]
});


mongoose.model("Winkelwagen", WinkelwagenSchema)