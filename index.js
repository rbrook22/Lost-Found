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

// Loads Home Page
app.get('/', (req, res) => {
    res.render('homepage');
});

// Loads Found Item Page when Found Button Clicked and loads all found items
app.get('/lostItem', (req, res, next) => {
    foundItem.getAll()
    .then((data) => {   
        res.render('lostItem', {items:data});
    })
    .catch((error) => { console.log(error); });
});

// Need to change below to search filters not posting data

// app.post('/lostItem', (req,res) => {
//     // res.send("You submitted the form");
//     console.log(req.body);
//     console.log(req.body.title);
//     console.log(req.body.description);
//     console.log(req.body.date);
//     console.log(req.body.time);
//     console.log(req.body.location);
//     console.log(req.body.email);

//     foundItem.addItem(req.body.title, req.body.description, req.body.date, req.body.time, req.body.location, req.body.email)
//     .then((data) => {
//         res.redirect('/lostItem');
//     })
// })
app.get('/foundItem', (req, res, next) => { 
        res.render('foundItem');
    })

app.post('/foundItem', (req,res) => {
    // res.send("You submitted the form");
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.date);
    console.log(req.body.time);
    console.log(req.body.email);
    console.log(req.body.location);
    console.log(req.body.description);

    foundItem.addItem(req.body.title, req.body.date, req.body.time, req.body.email, req.body.location, req.body.description)
    .then((data) => {
        res.render('foundItem');
    })
})
// Loads Edit page to update item by ID
app.get('/:itemid/editpage', (req, res) => {
    foundItem.getOne(req.params.itemid)
    .then((data) => {
        console.log(data);
        // res.send(data);
        res.render('editpage', data)
    })
});

app.post('/:itemid/editpage', (req, res) => {
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.date);
    console.log(req.body.time);
    console.log(req.body.email);
    console.log(req.body.location);
    console.log(req.body.description);
    
    foundItem.updateById(
        req.body.title,
        req.body.date,
        req.body.time,
        req.body.email,
        req.body.location,
        req.body.description,
        req.params.itemid)
    .then((data) => {
        console.log(data);
        res.redirect('/lostItem');
    })
})

// Delete Item by ID
app.get('/:itemid/deletepage', (req, res) => {
    foundItem.getOne(req.params.itemid)
    .then((data) => {
        console.log(data);
        res.render('deletepage', data)
    })
})
app.post('/:itemid/deletepage', (req, res) => {
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.date);
    console.log(req.body.time);
    console.log(req.body.location);
    console.log(req.body.email);

    foundItem.deleteById(req.params.itemid)
    .then((data) => {
        console.log(data);
        res.redirect('/lostItem');
    })
})

// Search By Title
app.post('/searchpage', (req, res) => {
    console.log(req.body.title);

    foundItem.searchByTitle(req.body.title)
    .then((data) =>{
        console.log(data);
        res.render('searchpage', {items:data});
    })
})

app.listen(3000, () => {
    console.log('your server is running!');
});