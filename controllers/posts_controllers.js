const Posts = require('../models/post');

module.exports.create = function (req , resp){
    if(req.isAuthenticated()){   
    Posts.create({
        content : req.body.content,
        user : req.user._id
    }, function(err, post){
        if(err){
            console.log("Error in creating Post");
            return;
        }
        console.log("Post Created Successfully :" , post);
        return resp.redirect('back');
    })
    return; 
}else{
    resp.redirect('back');
}
}