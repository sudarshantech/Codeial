const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

// here passport.checkAuthentication will check if user signed in then he could access the profile page 
router.get('/profile/:id', passport.checkAuthentication, usersController.Profile);

// update route
router.post('/update/:id', passport.checkAuthentication, function(req, resp){
           usersController.update

});

router.get('/sign-up', usersController.Signup);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);


// use passport as middleware to authenticate -->
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
    
    ) , usersController.createSession);
    
    router.get('/sign-out', usersController.destroySession);

module.exports = router;