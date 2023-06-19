const express = require('express');

const router = express.Router();

// importing controller from controllers/home_controllers.js  -->
const homeController = require('../controllers/home_controllers');

const postsController = require('../controllers/users_controller');


console.log("Express Route Loaded");

// Setting Controller and Router -->
router.get('/', homeController.home);

// following code is for like this --> localhost:8000/users/profile 
router.use('/users' , require('./users'));

// users url showing --->
router.use('/users',postsController.postProfile);

// posts router importing
router.use('/posts', require('./posts'));

// Comment router Importing 
router.use('/comments', require('./comments'));

// exporting router
module.exports = router;