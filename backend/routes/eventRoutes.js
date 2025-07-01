

import express from 'express';
import { initiateDb, closeConnexion } from '../connect.js'

const eventRoutes = express.Router();

let db;

// Get all events
eventRoutes.get('/', async (req, res) => {

    let { userId } = req.query

    db = initiateDb()

    let query = `SELECT * FROM events WHERE persons LIKE '%${userId}%'`;

    db.all(query, (err, eventRow) => {
        if (err) {
            console.log(err);
            return;
        }

        if (eventRow) {
            return res.send({ 'msg': eventRow })

        }

        else res.status(403).send({ "msg": "No such contact" });

    })

});

// Get info about single event
eventRoutes.get('/:eventId/', async (req, res) => {

    let eventId = Number(req.params.eventId)

    if (!isNaN(eventId)) {
        db = initiateDb()

        let query = "SELECT * FROM events WHERE id = ?";
        db.get(query, [eventId], (err, contactRow) => {
            if (err) {
                console.log(err);
                return;
            }

            if (contactRow) {
                res.send({ 'msg': contactRow })
            }

            else res.status(403).send({ "msg": "No such contact" });

        });
    }

    else {
        res.status(404).send({ 'msg': 'No such url accoridng to URL parameter' })
    }

});


eventRoutes.post('/', (req, res) => {

    let { date, description, atendees, place } = req.body

    db = initiateDb()

    let query = "INSERT INTO events (date, place, persons, title) VALUES (?, ?, ?, ?)";

    db.run(query, [date, place, `[${atendees.toString()}]`, description], (err) => {
        if (err) {
            res.status(500).send({ "error": err });
            return;
        }
        else res.status(200).send({ 'msg': 'Event successfully created' })
    })

})

export { eventRoutes }