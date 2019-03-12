const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const hbs = require('hbs');

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// var abc = router.get('/', (req, res) => {
//     //res.send('<h1>Welcome Express</h1>');
//     res.send({
//         name: 'Tufail',
//         likes: [
//             'Biking',
//             'Cities'
//         ]
//     })
// });

// app.use('/', abc);
app.use((req, res, next) => {
    var now = Date().toString();
    //res.send('<h1>Server Down due to Maintainence</h1>');
    console.log(`${now} : ${req.method} : ${req.url}`);
    next();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to Node.js and Express.js and Changes have been made'
    });
})

app.get('/json',(req,res) => {
    res.send({
        name:'Tufail',
        likes:[
            'Biking',
            'Cities'
        ]
    });
});

app.post('/world',(req, res) => {
    console.log(req.body);
    res.send({firstName:"Chal Rahi Hai"});
});

app.post('/login',(req, res) => {
    console.log(req.body);
    const {username, password} = req.body.user;
    if(username == 'admin' && password == 'admin'){
        res.send({
            status:'success'
        })
    }
    else{
        res.send({
            status:'failed'
        });
    }
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage:'Server Unavailable!'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});