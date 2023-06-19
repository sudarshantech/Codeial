const express = require('express');
const router = express.Router();
const passport = require('passport');

const postcontroller = require('../controllers/posts_controllers');

router.post('/create',passport.checkAuthentication,postcontroller.create);

// deleing posts --->
router.get('/destroy/:id',passport.checkAuthentication, postcontroller.destroy);



module.exports = router;