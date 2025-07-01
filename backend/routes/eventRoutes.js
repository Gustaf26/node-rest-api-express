

import express from 'express';
import { initiateDb, closeConnexion } from '../connect.js'

const eventRoutes = express.Router();

let db;
// Get info about single event
eventRoutes.get('/:eventId', async (req, res) => {

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

    let { date, description, atendees, place, userId } = req.body

    db = initiateDb()

    let randomId = Math.floor(Math.random(0, 10000000))

    let query = "INSERT INTO events (id, date, place, persons, title) VALUES (?, ?, ?, ?, ?)";

    db.run(query, [randomId, date, place, `[${atendees.toString()}]`, description], (err) => {
        if (err) {
            res.status(500).send({ "error": err });
            return;
        }
    })

    query = `UPDATE persons SET events = '[${randomId}]' WHERE id = ${userId}`;
    db.run(query, (err) => {
        if (err) {
            res.status(500).send({ "error": err });
            return;
        }

        else res.status(200).send({ 'msg': 'Event successfully created' })
    })

})

export { eventRoutes }