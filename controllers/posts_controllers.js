const Posts = require('../models/post');
const Comment = require('../models/comments');
// creating posts --->
module.exports.create =async function (req, resp) {
    if (req.isAuthenticated()) {
        try {
           let post = await Posts.create({
                content: req.body.content,
                user: req.user._id
            });

            // here we receives posts in xml Http Request == xhr then we will return json file 
            // we have send the data in home_posts with ajax and here we receives
            if(req.xhr){
                return resp.status(200).json({
                    data : {
                        post : post
                    },
                    message : "Post Created !"

                });
            }
            req.flash('success', 'Post Published !')
            return resp.redirect('back');
            
            
        } catch (err) {
            req.flash('error', err);
            // console.log("Error: ",err);
            return;
            
        }
       
    }
}


// deleting a Posts -->
// converting it to async await -->
module.exports.destroy = async function (req, resp) {

    try {
        // finding a post if there is post the following action perform
     let post = await Posts.findById(req.params.id);

     // checking here logged user and deleting user post is same user created or not 
     // .id means converting the object Id into String --->
     if (post.user == req.user.id) {
         // Post deleting --> 
         post.remove();
         console.log("Post Deleted Successfully: ", post);
         req.flash('error', 'Post And Associated Comments Deleted Successfully');
         /// Comment Deleting --->
         // deleteMany  Means it will Delete all comment in Db With Some Query --->
         await Comment.deleteMany({ post: req.params.id });
         return resp.redirect('back');
         // if User dint Match -->
     } else {
         return resp.redirect('back');
     }
        
    } catch (err) {
        console.log("Error:", err);
        return;
        
    }
    
}