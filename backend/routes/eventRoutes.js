

import express from 'express';
// import { initiateDb, closeConnexion } from '../connect.js'

import { getAllEvents, getSingleEvent, createEvent, deleteEvent } from '../controllers/eventsController.js';


const eventRoutes = express.Router();


// Get all events
eventRoutes.get('/', getAllEvents);

// Get info about single event
eventRoutes.get('/:eventId/', getSingleEvent);


eventRoutes.post('/', createEvent)

eventRoutes.post('/:eventId', deleteEvent)

export { eventRoutes }