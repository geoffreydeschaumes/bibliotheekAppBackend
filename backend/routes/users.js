let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let passport = require('passport');

router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  let user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) {
      console.log(err)
      return next(err);
    }
    return res.json({ token: user.generateJWT()});
  });
});

router.post('/login/', function(req, res, next) {
  
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({ token: user.generateJWT() });
     
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.get('/userById/:id', function(req, res, next) {
    
  User.find({_id: req.params.id},function(err, result) {
      if(err){
      return next(err);
      }
      res.json(result[0]);
  })    
});


router.post('/checkusername', function(req, res, next) {
  User.find({ username: req.body.username }, function(err, result) {
    if (result.length) {
      res.json({ username: 'bestaat al'});
    } else {
      res.json({ username: 'bestaat nog niet'});
    }
  });
});


module.exports = router;