import express from 'express';
import { DB } from './connect.js'

const routes = express.Router();

routes.get('/', async (req, res) => {

    let query = 'SELECT * FROM contacts'

    let contacts = { contacts: [] }

    try {
        DB.all(query, [], (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            rows.forEach(row => contacts.contacts.push({ contact_id: row.contact_id, contact_name: row.contact_name, contact_email: row.contact_email }))

            if (contacts.contacts.length === 0) throw new Error('No contacts found');

            else { res.send(JSON.stringify({ "msg": contacts.contacts })); }
        });

    } catch (error) {
        res.send(JSON.stringify({ "error": error }));
    }

});

export { routes }