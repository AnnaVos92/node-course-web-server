const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// port is filled out by Heroku, otherwise 3000
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// next signifies when middleware function is done
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

// MAINTENANCE PAGE
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Under construction',
//         message: 'We\'ll be back soon'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// '/' refers to current page, 'root' route
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');

    // when sending an object, it is automatically converted to json
    // res.send({
    //     name: 'Anna',
    //     likes: [
    //         'pole dance',
    //         'aerial hoop',
    //         'reading',
    //         'APEX polewear'
    //     ]
    // });

    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to the home page'
    });
});

// render 'about' page, 'about route'
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

// render 'projects' page
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

// create 'bad' page
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong'
    });
});

// app.get('/maintenance', (req, res) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Under construction',
//         message: 'We\'ll be back soon'
//     });
// });

// 3000 is common port for developing locally
// in cmd start nodemon to access the port
// in browser, type localhost:3000
app.listen(port, () => {
    // something to do once it is up and running
    console.log(`Server is up and running on port ${port}!`);
});