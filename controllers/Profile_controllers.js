module.exports.profile = function(req , resp){
    // resp.end('<h1>User Profile For Codeiel</h1>');
    return resp.render('../views/profile.ejs',{
        title : "Profile"
    });
}