import express from 'express';
import { initiateDb } from './connect.js'
import createError from 'http-errors'

const routes = express.Router();

let db;

const closeConnexion = (database) => {

    database.close((err) => {
        if (err) {
            console.error('Error closing the connection', err.message);
            return;
        }
        console.log('Database connection closed.');
    });
}


routes.all('/', (req, res, next) => {

    db = initiateDb()

    next()

})

routes.get('/', async (req, res, next) => {

    let query = 'SELECT * FROM contacts'

    let contacts = { contacts: [] }

    try {
        db.all(query, [], (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            rows.forEach(row => contacts.contacts.push({ contact_id: row.contact_id, contact_name: row.contact_name, contact_email: row.contact_email }))

            if (contacts.contacts.length === 0) throw new Error('No contacts found');

            else { res.send({ "contacts": contacts.contacts }); }

            closeConnexion(db)
            next()
        });


    } catch (error) {
        res.send({ "error": error });
        closeConnexion(db)
    }

});

// Load user by id

routes.param('id', function (req, res, next, id) {

    db = initiateDb()

    req.contactId = id

    if (req.contactId) {
        let query = "SELECT * FROM contacts WHERE contact_id = ?";

        try {
            db.get(query, [req.contactId], (err, row) => {
                if (err) {
                    throw (err);
                }

                if (row) next();
            })
        }
        catch (error) {
            next(createError(404, 'failed to find contact'));
            closeConnexion(db)
        }
    } else {
        next(createError(404, 'failed to find contact'));
        closeConnexion(db)
    }
});

routes.get('/:contactId', async (req, res) => {

    let id = Number(req.params.contactId)

    db = initiateDb()

    let query = "SELECT * FROM contacts WHERE contact_id = ?";

    try {
        db.get(query, [id], (err, row) => {
            if (err) {
                console.log(err);
                return;
            }

            if (row) res.send({ "contact": row })

            else res.send({ "msg": "No such contact" });

            closeConnexion(db)

        });


    } catch (error) {
        res.send({ "error": error });
    }

});



export { routes }