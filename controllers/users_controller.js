module.exports.postProfile = function(req , resp){
    // return resp.end('<h1>Posts Profile</h1>');
    return resp.render('Users', {
        title : 'Users'
    })
}