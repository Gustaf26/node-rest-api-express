import sqlite3 from 'sqlite3';
const sql3 = sqlite3.verbose();

// const DB = new sql3.Database(':memory:', sqlite3.OPEN_READWRITE, connected);
// const DB = new sql3.Database('', sqlite3.OPEN_READWRITE, connected);


// The sql3 class has a constructor function, and takes as arguments the name 
// of the database file and a callback function with the purpose of the database in between.
const DB = new sql3.Database('./mycontacts.db', sqlite3.OPEN_READWRITE, connected);

function connected(err) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('Created the DB or SQLite DB does already exist');
}

let sql = `CREATE TABLE IF NOT EXISTS contacts(
  contact_id INTEGER PRIMARY KEY,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL
)`;
DB.run(sql, [], (err) => {
    //callback function
    if (err) {
        console.log('error creating enemies table');
        return;
    }
    console.log('CREATED TABLE');
});

export { DB };