// controller -->
module.exports.home = function(req , resp){
    // return resp.end('<h1>Express is up for Codeial !</h1>');
    return resp.render('home', {   
        title : 'Home'
    });

}