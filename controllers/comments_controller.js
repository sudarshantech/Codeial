const Comment = require('../models/comments');
const Post = require('../models/post');

// here we have to find the post if it is present then only we have to put on the comments 
module.exports.create = function (req, resp) {
    // finding a Post
    Post.findById(req.body.post, function (err, post) {
        if (err) {
            console.log(err);
        }
        if (post) {
            // Post Found Then creating Comment 
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                // Handle Error -->
                if (err) {
                    console.log("error in creating Comment");
                    
                    return;
                }

                // Updating --->
                // this comment is pushed to Post and this is automatically fetch out the id and push it
                // and when we update something we have to save it 
                console.log("Commented Successfully: ", comment);
                req.flash('success', 'Commented Successful');
                post.comments.push(comment);
                post.save();

                resp.redirect('/');
            })


        }
    })

}


// Comments Deleting --->
module.exports.destroy = function (req, resp) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {
            console.log("Error:", err);
        }

        
        
        if (comment.user == req.user.id) {

            console.log("Comment deleted successfully: ", comment);
            req.flash('error', 'Your Comment Deleted !');

            let postId = comment.post;

            comment.remove();

            // here we are going inside the Posts and inside comments and pulling inside comment a comment id and deleting it --->
            // after deleting comment inside post then we have to update it --->
            // we have to pull out id inside posts inside comment following is in built syntax --->
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                return resp.redirect('back');
            })
        }
        else {

            return resp.redirect('back');

        }

    });
}