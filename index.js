// Starting express Server -->
const express = require('express');
const app = express();
const port = 8000;

// used for session cookie -->
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// cookie storing in mongodb 
const MongoStore = require('connect-mongo')(session);

// flash messages require library --->
const flash = require('connect-flash');
// importing flash middleware
const customMware = require('./config/middleware');


//  due to error by installing node sass middleware -->
// const sassMiddleware = require('sass');
// app.use(sassMiddleware({
//     src : '/assets/scss',
//     dist: '/assets/css',
//     debug : true,
//     outputStyle : 'extended',
//     prefix : '/css'

// }));

// cookie parser require library
const cookieParser = require('cookie-parser');
// telling express to use it
app.use(cookieParser());

//  DataBase  --->
// importing mongoose Server
const db = require('./config/mongoose');
// importing Database 
const User = require('./models/users');

// middleware
app.use(express.urlencoded());


// importing static files -->
app.use(express.static('./assets'));

// directly it will not get file path to browser so we have to set the file path by following code--->
// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));


// setting ejs View-Engine  ---->
app.set('view engine', 'ejs');
// setting ejs file path
app.set('views', './views');


// express-ejs-layouts -------->
// telling express we are using ejs layout
const expressLayouts = require('express-ejs-layouts');
// calling  expressLayouts -->
app.use(expressLayouts);

// Extract styles and scripts from sub pages into the layouts -->
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// cookie encrypted above secrete name 
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secrete before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // cookie is permanently store 
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },

        function (err) {
            console.log(err || "Connect-Mongodb Setup Ok");
        }

    )
}));

//  we need tell app to use passport 
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// telling express js to use connect flash messages and we have to put it down cookies session down because it uses cookies
app.use(flash());
// to use imported middleware -->
app.use(customMware.setFlash);



// importing Index.js Routes -->
// use express route from route/index.js
app.use('/', require('./routes/'));
// use express route from route/users.js
// app.use('/users' , require('./routes/users'));


// Express Server Starting ----> 
app.listen(port, function (err) {
    if (err) {
        // here we are using interpolation -->
        console.log(`Error : In Running a Server ${err}`);
    }

    console.log(`Express Server Is Running On Port :  ${port}`);

})

