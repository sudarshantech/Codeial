// importing models/users.js file -->
// because to find emails in database if presents return error for sign up page
const User = require('../models/users');

// rendering users url
module.exports.postProfile = function (req, resp) {
    // return resp.end('<h1>Posts Profile</h1>');
    return resp.render('Users', {
        title: 'Codeial | Users'
    })
};

// rendering profile url
// and showing details of signed user in profile.ejs -->
// and if not signed it does not show profile page in browser -->
module.exports.Profile = function (req, resp) {
    return resp.render('Profile', {
        title: "Profile",
        // user: user
    })

    // show details of signed user --->
    // if (req.cookies.user_id) {
    //     User.findById(req.cookies.user_id, function (err, user) {
    //         if (user) {
    //             return resp.render('Profile', {
    //                 title: "Profile",
    //                 user: user
    //             })
    //         }

    //         // return resp.redirect('back');
    //     });

    // }
    // else {
    //     return resp.redirect('/users/sign-in');
    // }
}

// rendering sign up url
module.exports.Signup = function (req, resp) {
    if (req.isAuthenticated()) {
        return resp.redirect('/users/profile');
    }
    return resp.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

// rendering sign in url
module.exports.signIn = function (req, resp) {
    // if user is signed in already and he is going to access sign in page again but we don't want that
    if (req.isAuthenticated()) {
        return resp.redirect('/users/profile');
    }
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

    // if in database already email register then it will not create it will return back
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

// -----------------------------------------------------------------------------------------------------------------------------

//  sign In and create a session for a user ----->
// module.exports.createSession = function (req, resp) {
//     // Steps to authenticate -->
//     // find the user
//     User.findOne({ email: req.body.email }, function (err, user) {
//         if (err) {
//             console.log("error in finding a user while sign in");
//             return
//         }

//         // handle user found 
//         if (user) {
//             // handle password if doesn't match 
//             if (user.password != req.body.password) {
//                 return resp.redirect('back');
//             }

//             // handle session created
//             resp.cookie('user_id', user.id);
//             return resp.redirect('/users/profile'), console.log(`${user} Login Successful`);
//         }
//         // handle user not found 
//         else {
//             return resp.redirect('back');
//         }
//     })
// }


// -----------------------------------------------------------------------------------------------------------------------------

// above code we do not use because we are using passport js
// sign in and create session for user -->
module.exports.createSession = function (req, resp) {
    return resp.redirect('/users');
}

// log out 
module.exports.destroySession = function (req, resp, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return resp.redirect('/users/sign-in');
            }
        });
    }
    //     req.logout();

    //    return resp.redirect('/');
}