const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

// Import Database -->
const User = require('../models/users');

// Authentication Using Passport
passport.use(new LocalStrategy({
    usernameField : "email"
},


function(email, password, done){
    // Find a User And Establish The Identity
    User.findOne({email : email}, function(err, user){
        if(err){
            console.log("Error in finding User ---> passport")
            return done(err);
        }

        if(!user || user.password != password){
            console.log("Invalid Username/Password");
            return done(null, false);
        }

        return done(null, user);
    })

}

));


// serializing the user to decide which key is to be kept in cookies 
passport.serializeUser(function(user, done){
      done(null, user.id);
});


// deserialize the user from the key in the cookies
passport.deserializeUser(function(id , done){
    User.findById(id, function(err, user){
        if(err){
             console.log("Error in finding User ---> passport")
            return done(err);
        }

        return done(null, user);
    })
});

// check if user is authenticated the only he could access the profile page
passport.checkAuthentication = function(req, resp, next){
    // if the user is signed in then pass on the request to the next function (controllers function)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in 
    return resp.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, resp, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views\
        resp.locals.user =  req.user; 
    }
    next();
}


module.exports = passport;