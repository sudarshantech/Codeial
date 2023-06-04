// Starting express Server -->
const express = require('express');
const app = express();
const port = 8000;


// importing static files -->
app.use(express.static('./assets'));


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



// importing Index.js Routes -->
// use express route from route/index.js
app.use('/', require('./routes/index'));
// use express route from route/users.js
// app.use('/users' , require('./routes/users'));



app.listen(port, function (err) {
    if (err) {
        // here we are using interpolation -->
        console.log(`Error : In Running a Server ${err}`);
    }

    console.log(`Server Is Running On Port :  ${port}`);

})

