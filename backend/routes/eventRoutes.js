

import express from 'express';

import { getAllEvents, getSingleEvent, createEvent, deleteEvent } from '../controllers/eventsController.js';
import errorHandler from '../middleware/errorMiddelware.js';


const eventRoutes = express.Router();

// I´ll put the logger here before any other route to be called, applying to them all
// eventRoutes.use(logger)


// Get all events alt createEvent
eventRoutes.route('/')
    .get(errorHandler, getAllEvents)
    .post(errorHandler, createEvent);

// Get info about single event or delete it
eventRoutes.route('/:eventId/')
    .get(errorHandler, getSingleEvent)
    .post(errorHandler, deleteEvent)

export { eventRoutes }