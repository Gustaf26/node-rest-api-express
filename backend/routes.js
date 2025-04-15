import express from 'express';
import { initiateDb, closeConnexion } from './connect.js'
// import createError from 'http-errors'

const routes = express.Router();

let db;

// const checkIfFriend = (db, contactId, ownId, contactRow, res) => {

//     let query = "SELECT * FROM persons WHERE id = ?";

//     db.get(query, [ownId], (err, row) => {
//         if (err) {
//             console.log(err);
//             return;
//         }

//         if (row) {

//             let nearFriends = JSON.parse(row.nearFriends)
//             console.log(nearFriends)

//             if (nearFriends.includes(contactId)) res.send({ "contact": { name: contactRow.name, email: contactRow.email, phone: contactRow.phone } })
//             else { res.send({ "contact": { name: contactRow.name, phone: contactRow.phone } }) }
//             closeConnexion(db)
//         }

//         else {
//             closeConnexion(db)
//             return res.status(400).send({ "msg": 'You must provide a correct own id' })
//         }
//     })

// }



routes.get('/', async (req, res, next) => {

    let query = 'SELECT * FROM persons'

    db = initiateDb()

    let contacts = { contacts: [] }

    try {
        db.all(query, [], (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            rows.forEach(row => contacts.contacts.push({ id: row.id, name: row.name, email: row.email, thumbnail: row.thumbnail, phone: row.phone }))

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

routes.get('/events/:eventId', async (req, res, next) => {

    let eventId = Number(req.params.eventId)
    // let ownId = req.body.own_id

    // console.log(ownId)

    db = initiateDb()

    let query = "SELECT * FROM events WHERE id = ?";


    db.get(query, [eventId], (err, contactRow) => {
        if (err) {
            console.log(err);
            return;
        }

        if (contactRow) {
            // checkIfFriend(db, contactId, ownId, contactRow, res, next)
            res.send({ 'msg': contactRow })
        }

        else res.status(403).send({ "msg": "No such contact" });

    });

});


routes.get('/:contactId', async (req, res, next) => {

    let contactId = Number(req.params.contactId)
    // let ownId = req.body.own_id

    // console.log(ownId)

    db = initiateDb()

    let query = "SELECT * FROM persons WHERE id = ?";


    db.get(query, [contactId], (err, contactRow) => {
        if (err) {
            console.log(err);
            return;
        }

        if (contactRow) {
            // checkIfFriend(db, contactId, ownId, contactRow, res, next)
            res.send({ 'msg': contactRow })
        }

        else res.status(403).send({ "msg": "No such contact" });

    });

});



export { routes }