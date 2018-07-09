const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
const foundItem = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const static = express.static;
app.use(static('public'));

app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/foundItem', (req, res, next) => {
    foundItem.getAll()
    .then((data) => {   
        res.render('foundItem', {items:data});
    })
    .catch((error) => { console.log(error); });
});
app.post('/foundItem', (req,res) => {
    // res.send("I heard ya bitch");
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.date);
    console.log(req.body.time);
    console.log(req.body.location);
    console.log(req.body.email);

    foundItem.addItem(req.body.title, req.body.description, req.body.date, req.body.time, req.body.location, req.body.email)
    .then((data) => {
        res.redirect('/foundItem');
    })
})


app.listen(3000, () => {
    console.log('your server is running!');
});