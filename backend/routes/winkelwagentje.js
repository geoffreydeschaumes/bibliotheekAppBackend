let mongoose = require('mongoose');
let WinkelWagen = mongoose.model('Winkelwagen');
let Boek = mongoose.model('Boek');
let User = mongoose.model('User');
var express = require('express');
var router = express.Router();
let jwt =require('express-jwt');
let auth = jwt({secret: process.env.BIBLIOTHEEKPROJECT_BACKEND_SECRET});

 router.post('/', auth,  function(req, res, next) {
    let connectedUser = req.user;
    console.log(req.user);
    // Fetch the user by id 
    new Promise((resolve, reject) => {
        User.findById(connectedUser._id, function (err, user) {
            if (err)
                next(err);
            resolve(user)
        });
    })
    .then(user => {
        let boekenIDs = [];
        req.body.forEach(b => boekenIDs.push(b.WerkID));
        Boek.find({
            'WerkID': { $in: boekenIDs}
        }, function(err, boeks){
            let cart = {
                user: user,
                boeken: boeks
            };
            WinkelWagen.create(cart, function (err, cart) {
                if (err) { 
                    next(err);
                }
                else {
                    res.json(cart);
                }
            })
        });
    })
 });
 router.get('/',function(req, res, next){
    
    WinkelWagen.find(function(err, result) {
        if(err){
            return next(err);
        }
        console.log(result);
        res.json(result);
    })     
 })

module.exports = router;

