// importing models/users.js file -->
// because to find emails in database if presents return error for sign up page
const res = require('express/lib/response');
const User = require('../models/users');
const { use } = require('passport');
const fs = require('fs');
const path = require('path');

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
    User.findById(req.params.id, function (err, user) {
        return resp.render('Profile', {
            title: "Profile",
            // user: user
            profile_user: user
        })

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

// Update Controller ----->
module.exports.update = async function (req, resp) {

    // if current logged in user matches then -->
    // if (req.user.id == req.params.id) {

    //     User.findByIdAndUpdate(req.params.id, req.body, (err, user)=> {
    //         if(err){
    //             console.log("error in Updating User");
    //         }
    //         else{
    //             console.log(user);
    //         }
    //         // console.log(err);
    //         console.log("User Updated Successfully: ",user);

    //         return resp.redirect('back');
    //     });

    // } else {
    //     return resp.status(401).send('Unauthorized');
    // }

    if (req.user.id == req.params.id) {

        try {
            // 1 find the user first 
            let user = await User.findById(req.params.id);
            //
            User.uploadedAvatar(req, resp, function (err) {
                if (err) {
                    console.log("***** Multer ***** : ", err);
                }
                // console.log(req.file);

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    // to unlink the avatar if upload the another image and it does not store the older avatar--->
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    
                    // user.avatar current user and User.avatarPath -> file Path + req.file.filename -> file that saves 
                    // this is saving the path og uploaded file in the avatar field in the user -->
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    req.flash('success', 'Your Avatar Uploaded Successfully');

                }
                
                if (!req.file) {
                    
                    req.flash('error', 'Please Choose Your Avatar!');

                }
                // and last save the user -->
                user.save();
                // return back
                return resp.redirect('back');

            });
        }

        catch (err) {
            req.flash('error', err);
            return resp.redirect('back');

        }

    } else {
        req.flash('error', 'Unauthorized');
        return resp.status(401).send('Unauthorized');

    }


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
        if (req, err) {
            console.log('Error in finding user in sign up');
            return;
        }

        // if user is not created already then it will create new one and redirects to sign in 
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('Error in while creating User while Sign Up'); return; }

                req.flash('success', 'Account Created Successfully !');
                return resp.redirect('/users/sign-in');
            })

        } else {
            req.flash('error', 'User Already Exist');
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
    // here we have to send this request flash messages to response page for this we create our own middleware in
    req.flash('success', 'Logged In Successfully');
    // return resp.redirect('/users');
    return resp.redirect('/');
}

// log out 
module.exports.destroySession = function (req, resp, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return resp.redirect('/');
            }
        });

    }
    //     req.logout();

    //    return resp.redirect('/');
}