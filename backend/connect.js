import 'dotenv/config'


// import sqlite3 from 'sqlite3';
// const sql3 = sqlite3.verbose();

// This option just for in-memory db:s that dissappear from emory after being used
// const DB = new sql3.Database(':memory:', sqlite3.OPEN_READWRITE, connected);

// This option... is another option
// const DB = new sql3.Database('', sqlite3.OPEN_READWRITE, connected);

// The sql3 class has a constructor function, and takes as arguments the name 
// of the database file and a callback function with the purpose of the database in between.

// const initiateDb = () => {
//     return new sql3.Database('./mycontacts.db', sqlite3.OPEN_READWRITE, connected);
// }


// function connected(err) {
//     if (err) {
//         console.log(err.message);
//         return;
//     }
//     console.log('Database is open');
// }

// const closeConnexion = (database) => {

//     database.close((err) => {
//         if (err) {
//             console.error('Error closing the connection', err.message);
//             return;
//         }
//         console.log('Database connection closed.');
//     });
// }

// export { initiateDb, closeConnexion };

import { MongoClient } from "mongodb";

// Replace the uri string with your connection string
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

async function initiateDb() {

    try {
        const database = client.db('Calendar');
        // const events = database.collection('events');

        // // Queries for a movie that has a title value of 'Back to the Future'
        // const query = { place: 'Pandora' };
        // const event = await events.findOne(query);
        return database

    } finally {
        await client.close();
    }


}

export { initiateDb }
