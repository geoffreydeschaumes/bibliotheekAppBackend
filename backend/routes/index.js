var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Boek = mongoose.model('Boek');
let jwt =require('express-jwt');
const Request = require('request');
let auth = jwt({secret: process.env.BIBLIOTHEEKPROJECT_BACKEND_SECRET});

/*
// databank van url halen, moet niet aanstaan als de boeken nog in db zitten.
router.get('/getData', function(req, res, next){
    Request.get("https://datatank.stad.gent/4/cultuursportvrijetijd/bibliotheekwerken.json", (error, response, data) => {
        if(error) {
            return next(error);
        } else {            
            JSON.parse(data).forEach(b => {
            Boek.create(b, function (err, small) {
                if (err) return next(err);
                // saved!
              })
            });
        }
        res.send("ok");
        
    });
});
*/

router.get('/boeken', function(req, res, next) {
    Boek.find(function(err, result) {
        if(err){
            return next(err);
        }
        res.json(result);
    })    
});

router.get('/boek/:id', function(req, res, next) {
    
    Boek.find({WerkID: req.params.id},function(err, result) {
        if(err){
        return next(err);
        }
        res.json(result[0]);
    })    
});

router.get('/boekWinkelwagentje/:id', function(req, res, next) {
    
    Boek.find({_id: req.params.id},function(err, result) {
        if(err){
        return next(err);
        }
        res.json(result[0]);
    })    
});

module.exports = router;
