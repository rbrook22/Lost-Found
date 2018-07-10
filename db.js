const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'lost-found-app',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);

function getAll() {
    return db.any('Select * from foundformdata');
}

// getAll()
//     .then((data) => { console.log(data); })
//     .catch((error) => { console.log(error); });


function getOne(itemid) {
    return db.oneOrNone('Select * from foundformdata where itemid=$1', [itemid]);
}

// getOne(2)
//     .then(function(data) {
//         // success;
//         console.log(data);
//     })
//     .catch(function(error) {
//         // error;
//         console.log('this is the error that happened');
//         console.log(error);
//     });

function searchByTitle(searchString) {
    return db.any("select * from foundformdata where title ilike '%$1#%'", [searchString]);
}

// searchByTitle('wallet')
//     .then((data) => { console.log(data); })
//     .catch((error) => { console.log(error); });

function deleteById(itemid) {
    return db.oneOrNone('delete from foundFormData where itemid=$1', [itemid]);
}

    // deleteById(4)
    //     .then((data) => {console.log(data); })
    //     .catch((error) => {console.log(error); });

function updateById(title, itemdescription, datefound, timefound, locationfound, email, itemid, imageurl=" ") {
    return db.result(`update foundformdata
    set title='$1#',  
        itemdescription='$2#', 
        datefound='$3#',
        timefound='$4#', 
        locationfound='$5#',
        imageurl='$6#',
        email='$7#'
    Where itemid=$8`, [title, itemdescription, datefound, timefound, locationfound, email, itemid, imageurl=" "]);
}

    // updateById('Iphone X', 'Iphone X 256gb Silver', '06/21/2018', '1:30 pm', '3323 Piedmont Rd NE, Atlanta, GA, 30324', 'atvPhone.com', 'atvtech@gmail.com', 1)
    //     .then((data) => {console.log(data); })
    //     .catch((error) => {console.log(error); });

    function addItem(title, itemdescription, datefound, timefound, locationfound, email, imageurl=" ") {
        return db.one(`INSERT INTO foundFormData
        (title, itemdescription, datefound, timefound, locationfound, imageurl, email)
    VALUES 
        ('$1#', '$2#', '$3#', '$4#', '$5#', '$6#' ,'$7#') returning itemid`, [title, itemdescription, datefound, timefound, locationfound, imageurl, email]);
    }

        // addItem('computer', 'macbook pro 15 inch 16gb ram', '03/15/2018', '3:00 pm', '225 Summermore Dr, Charlotte, NC, 28270', 'adafruit.com', 'dhhannigan@yahoo.com')
        //     .then((data) => {console.log(data); })
        //     .catch((error) => {console.log(error); });


    module.exports = {
        getAll, 
        getOne,
        searchByTitle,
        deleteById,
        updateById, 
        addItem
    };