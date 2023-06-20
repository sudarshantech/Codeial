const Post =  require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/users');


// controller -->
module.exports.home = function(req , resp){
    // console.log(req.cookies);
    // changing cookie on server side -->
    // resp.cookie('Tony Stark', 45);

    // Post.find({},function(err, Posts){
    //     if(err){
    //         console.log("Error in Fetching Posts From Db");
    //     }
        
    // })

    // Fetching Post From Database --->
    // Populate the User of each Posts
    // Populating comments
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate :{
            path : 'user'
        }
    
    })

    .exec(function(err, posts){

        // showing the users name in home.ejs
        User.find({}, function(err, users){
            console.log(posts);
            return resp.render('home', {   
                title : 'Codeial | Home',
                posts : posts,
                all_users : users
            });
        })

    })

}