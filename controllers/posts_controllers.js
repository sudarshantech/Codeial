const Posts = require('../models/post');
const Comment = require('../models/comments');
// creating posts --->
module.exports.create = function (req, resp) {
    if (req.isAuthenticated()) {
        Posts.create({
            content: req.body.content,
            user: req.user._id
        }, function (err, post) {
            if (err) {
                console.log("Error in creating Post");
                return;
            }
            console.log("Post Created Successfully :", post);
            return resp.redirect('back');
        })
        return;
    } else {
        resp.redirect('back');
    }
}


// deleting a Posts -->
module.exports.destroy = function (req, resp) {
    // finding a post if there is post the following action perform
    Posts.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err);
        }

        // checking here logged user and deleting user post is same user created or not 
        // .id means converting the object Id into String --->
        if (post.user == req.user.id) {
            // Post deleting --> 
            post.remove();
            console.log("Post Deleted Successfully: ", post);
            /// Comment Deleting --->
            // deleteMany  Means it will Delete all comment in Db With Some Query --->
            Comment.deleteMany({ post: req.params.id }, function (err) {

                if(err){
                    console.log(err);
                }
                return resp.redirect('back');

            });

            // if User dint Match -->
        } else {
            return resp.redirect('back');
        }
    })

}

