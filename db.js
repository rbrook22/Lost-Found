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


function getOne(userid) {
    return db.oneOrNone('Select * from foundformdata where userid=$1', [userid]);
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



    module.exports = {
        getAll, 
        getOne,
        searchByTitle

    };