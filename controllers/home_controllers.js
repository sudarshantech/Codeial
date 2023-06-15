const Post =  require('../models/post');
// controller -->
module.exports.home = function(req , resp){
    console.log(req.cookies);
    // changing cookie on server side -->
    // resp.cookie('Tony Stark', 45);

    // Post.find({},function(err, Posts){
    //     if(err){
    //         console.log("Error in Fetching Posts From Db");
    //     }
        
    // })

    // Populate the User of each Posts
    Post.find({}).populate('user').exec(function(err, posts){
        return resp.render('home', {   
            title : 'Codeial | Home',
            posts : posts
        });

    })

}