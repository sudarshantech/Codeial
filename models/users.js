const mongoose = require('mongoose');

// importing multer
const multer = require('multer');
// importing Path 
const path =  require('path');
// telling Avatar path to going to store 
const AVATAR_PATH = path.join('/uploads/users/avatars');

const usersScheama = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar : {
        type : String
    }

}, {
    timestamps : true
});

let storage = multer.diskStorage({
    // cb Means Call back function --->
    destination : function (req, file, cb){
        // storing the image in uploads folder
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename : function(req, file, cb){
        // when i upload file its going to store in field that is avatar in schema and date also--> 
        cb(null, file.fieldname + '--' + Date.now());
    }
});

// static functions ----------->
// here its going to link the storage above multer.diskStorage to following Storage---->
// and single() says that user can going to upload only single file --->
usersScheama.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
// here we are going to make publicly available the avatar path 
// whenever we going accessing through controller we need say that here is going to save the file --->
usersScheama.statics.avatarPath = AVATAR_PATH;


const User = mongoose.model('User', usersScheama);
module.exports = User;