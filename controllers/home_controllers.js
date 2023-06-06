// controller -->
module.exports.home = function(req , resp){
    console.log(req.cookies);
    // changing cookie on server side -->
    resp.cookie('Tony Stark', 45);
    return resp.render('home', {   
        title : 'Codeial | Home'
    });

}