

import express from 'express';
// import { initiateDb, closeConnexion } from '../connect.js'

import { getAllEvents, getSingleEvent, createEvent, deleteEvent } from '../controllers/eventsController.js';
import errorHandler from '../middleware/errorMiddelware.js';


const eventRoutes = express.Router();


// Get all events
eventRoutes.get('/', errorHandler, getAllEvents);

// Get info about single event
eventRoutes.get('/:eventId/', errorHandler, getSingleEvent);


eventRoutes.post('/', errorHandler, createEvent)

eventRoutes.post('/:eventId', errorHandler, deleteEvent)

export { eventRoutes }