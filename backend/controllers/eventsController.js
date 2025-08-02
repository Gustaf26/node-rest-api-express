
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

// Update single event

export const updateEvent = async (req, res, next) => {

    let eventId = req.params.eventId

    let { date, description, persons, place } = req.body

    if (!eventId) {
        let error = new Error('No event id provided')
        return next(error);
    }

    try {
        const { db, client } = await initiateDb()
        const eventsCollection = db.collection('events')

        let updatedEvent = await eventsCollection.updateOne({ id: Number(eventId) },
            { '$set': { date: date, title: description, persons, place: place } })

        if (updatedEvent.matchedCount > 0) {
            res.send({ msg: 'Event successfully updated' })
        }
    }
    catch {
        let error = new Error('No events for that persons')
        error.status = 400
        return next(error);
    }

}

// Get info about single event

// export const getSingleEvent = async (req, res) => {

//     let eventId = Number(req.params.eventId)

//     if (!isNaN(eventId)) {
//         db = initiateDb()

//         let query = "SELECT * FROM events WHERE id = ?";
//         db.get(query, [eventId], (err, contactRow) => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }

//             if (contactRow) {
//                 res.send({ 'msg': contactRow })
//             }

//             else res.status(403).send({ "msg": "No such contact" });

//         });
//     }

//     else {
//         res.status(404).send({ 'msg': 'No such url accoridng to URL parameter' })
//     }

// }


export const createEvent = async (req, res) => {

    let { date, description, persons, place } = req.body

    try {
        const { db, client } = await initiateDb()
        const eventsCollection = db.collection('events')

        let ranNum = Math.floor(Math.random() * 100000)

        let createdEvent = await eventsCollection.insertOne({ id: ranNum, date: date, title: description, persons, place })

        if (createdEvent.acknowledged === true) {
            res.send({ msg: 'Event successfully created' })
        }
    }
    catch {
        let error = new Error('No events for that persons')
        error.status = 400
        return next(error);
    }


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
