// import { initiateDb, closeConnexion } from '../connect.js'


import { initiateDb } from '../connect.js'

const db = initiateDb()


export const getAllContacts = async (req, res, next) => {

    let { userId } = req.query

    // SQL syntax for SQLite database
    let query = `SELECT nearFriends FROM persons WHERE id=${Number(userId)}`

    db = initiateDb()

    let contacts = []


    db.get(query, [], async (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        if (rows.length === 0) res.send({ msg: contacts })

        else {

            contacts = JSON.parse(rows.nearFriends)

            let allinfo = []

            const getData = (contact) => {

                new Promise((resolve, reject) => {

                    let query = `SELECT * FROM persons WHERE id=${Number(contact)}`

                    db.get(query, [], (err, row) => {
                        if (err) {
                            console.log(err);
                            reject(null)
                        }
                        resolve(row)
                    })
                }).then(res => allinfo.push(res))
            }

            contacts.forEach(contact => getData(contact))

            setTimeout(() => {
                res.send({ "contacts": allinfo });
            }, 2000)
        }
        closeConnexion(db)
    });
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