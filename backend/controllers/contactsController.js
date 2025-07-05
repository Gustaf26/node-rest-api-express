import { initiateDb, closeConnexion } from '../connect.js'

let db;


export const getAllContacts = async (req, res, next) => {

    // SQL syntax for SQLite database
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

}

export const getSingleContact = async (req, res, next) => {

    let contactId = Number(req.params.contactId)

    db = initiateDb()

    let query = "SELECT * FROM persons WHERE id = ?";


    db.get(query, [contactId], (err, contactRow) => {
        if (err) {
            console.log(err);
            return;
        }

        if (contactRow) {
            res.send({ 'msg': contactRow })
        }

        else res.status(304).send({ "msg": "No such contact" });

    });

}