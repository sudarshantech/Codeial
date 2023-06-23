const Post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/users');


// controller -->
// and making code cleaner by async await --->
// and Error Handling --->
module.exports.home = async function (req, resp) {
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

    // Error handling with try Catch --<
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }

            });

        // showing the users name in home.ejs
        let users = await User.find({});
        console.log("ALL POSTS : ",posts);
        console.log("All Signed Users : ",users);
        return resp.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
            
        });
        
    } catch (err) {
        console.log("Error", err);
        return;

    }
    

}