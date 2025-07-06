
import express from 'express';

import { eventRoutes } from './routes/eventRoutes.js';
import { contactRoutes } from './routes/contactRoutes.js';
import errorHandler from './middleware/errorMiddelware.js';
import { logger } from './middleware/authMiddleWare.js';

import cors from 'cors'

let port = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(cors())

// Handle authenticated requests by the logger function
app.use(errorHandler, logger)

// Separate mini-apps for the routing
app.use('/contacts', contactRoutes);
app.use('/events', eventRoutes);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});