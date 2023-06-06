// importing models/users.js file -->
// because to find emails in database if presents return error for sign up page
const User = require('../models/users');

module.exports.postProfile = function (req, resp) {
    // return resp.end('<h1>Posts Profile</h1>');
    return resp.render('Users', {
        title: 'Codeial | Users'
    })
};

module.exports.Signup = function (req, resp) {
    return resp.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

module.exports.signIn = function (req, resp) {
    return resp.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// to get the sign up data 
module.exports.create = function (req, resp) {
    // if password is not equal to confirm password then redirect to same page 
    if (req.body.password != req.body.confirm_password) {
        return resp.redirect('back');
    }

    // if in database already email register then ir will not create it will return back
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('Error in finding user in sign up'); return; }

        // if user is not created already then it will create new one and redirects to sign in 
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('Error in while creating User while Sign Up'); return; }

                return resp.redirect('/users/sign-in');
            })

        } else {
            return resp.redirect('back');
        }

    });
}

//  sign In and create a session for a user
module.exports.createSession = function (req, resp) {
    // TODO Later
}