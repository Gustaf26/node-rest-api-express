
// import { initiateDb, closeConnexion } from '../connect.js'
import { initiateDb } from '../connect.js'

// Get all events
export const getAllEvents = async (req, res, next) => {

    let { userId } = req.query

    if (!userId) {
        let error = new Error('No user id provided')
        return next(error);
    }

    try {
        const { db, client } = await initiateDb()
        const eventsCollection = db.collection('events')

        let events = await eventsCollection.find({ persons: { $regex: `[${userId}]` } }).toArray()

        res.send({ msg: events })

    }
    catch {
        let error = new Error('No events for that persons')
        error.status = 400
        return next(error);
    }

}

// Get info about single event

export const getSingleEvent = async (req, res) => {

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

}


export const createEvent = (req, res) => {

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

}

export const deleteEvent = (req, res) => {

    db = initiateDb()

    let eventId = req.params.eventId

    let query = `DELETE FROM events WHERE id=${eventId}`;

    db.run(query, (err) => {
        if (err) {
            res.status(500).send({ "error": err });
            return;
        }
        else res.status(200).send({ 'msg': 'Event successfully deleted' })
    })

}
