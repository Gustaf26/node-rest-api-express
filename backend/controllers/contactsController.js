// import { initiateDb, closeConnexion } from '../connect.js'


import { initiateDb } from '../connect.js'


export const getAllContacts = async (req, res, next) => {

    let { userId } = req.query

    // SQL syntax for SQLite database
    // let query = `SELECT nearFriends FROM persons WHERE id=${Number(userId)}`

    try {
        const { db, client } = await initiateDb()

        const contactsCollection = db.collection('persons')

        let contacts = await contactsCollection.find({ id: Number(userId) }).project({ nearFriends: 1 }).toArray()

        contacts = JSON.parse(contacts[0].nearFriends)

        let fullContactsInfo = []

        const getContactsInfo = async (contact) => {

            let contactPromise = new Promise(async (resolve, reject) => {

                resolve(await contactsCollection.find({ id: Number(contact) }).toArray())

            })

            contactPromise.then(res => { fullContactsInfo.push(...res) })

        }

        contacts.forEach(async (contact) => {
            await getContactsInfo(contact)
        })

        setTimeout(() => {
            res.send({ contacts: fullContactsInfo })
        }, 1500)

    }
    catch {
        let error = new Error('No events for that persons')
        error.status = 400
        return next(error);
    }

}

export const getSingleContact = async (req, res, next) => {

    let contactId = Number(req.params.contactId)

    try {
        const { db, client } = await initiateDb()
        const contactsCollection = db.collection('persons')

        let person = await contactsCollection.findOne({ id: contactId })

        res.send({ msg: person })
    }
    catch {
        let error = new Error('No events for that persons')
        error.status = 400
        return next(error);
    }

}