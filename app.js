// express

const express = require('express');
const data = require('./data.json')
const app = express();

//Optionally - the path module which can be used when setting the absolute path in the express.static function.        
const path = require('path');

app.set('views', path.join(__dirname, 'views')); //https://www.w3schools.com/nodejs/met_path_dirname.asp
app.set('view engine', 'pug'); //set your “view engine” to “pug”


// Set up your middleware //

//use a static route and the express.static method to serve the static files located in the public folder
app.use('/static', express.static(path.join(__dirname, 'public'))) //https://expressjs.com/en/guide/using-middleware.html


///  Set your routes. You'll need // 

//Creating a Route with Express 

app.get('/', (request, response, ) => {
    response.render('index', { projects: data.projects }); // response.send will send a messege
});

app.get('/about', (request, response, ) => {
    response.render('about'); // response.send will send a messege
});

app.get('/project/:id', (request, response, ) => {
    const id = request.params.id
    response.render('project', { project: data.projects[id] }); // response.send will send a messege
});




app.use((request, response, next) => {
    const err = new Error("error");
    err.status = 404;
    next(err)
    response.render('error')
    console.log(err);
});

app.use((err, request, response, next) => {
    response.locals.error = err
    response.status(err.status)
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

