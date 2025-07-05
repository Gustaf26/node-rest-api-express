

import express from 'express';
// import { initiateDb, closeConnexion } from '../connect.js'

import { getAllContacts, getSingleContact } from '../controllers/contactsController.js';

const contactRoutes = express.Router();

let db;

// First function to access requests starting with /
// It gets all the contacts in the db
contactRoutes.get('/', getAllContacts);

// Get data from a person - contact
contactRoutes.get('/:contactId', getSingleContact);

export { contactRoutes }