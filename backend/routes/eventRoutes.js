

import express from 'express';

import { getAllEvents, createEvent, deleteEvent, updateEvent } from '../controllers/eventsController.js';

import errorHandler from '../middleware/errorMiddelware.js';

const eventRoutes = express.Router();

// I´ll put the logger here before any other route to be called, applying to them all
// eventRoutes.use(logger)

eventRoutes.route('/').get(errorHandler, getAllEvents)
eventRoutes.route('/:eventId/').put(errorHandler, updateEvent)
// .get(errorHandler, getSingleEvent)

eventRoutes.route('/').post(errorHandler, createEvent);
eventRoutes.route('/:eventId/').post(errorHandler, deleteEvent)

export { eventRoutes }