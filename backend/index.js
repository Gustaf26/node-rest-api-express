
import express from 'express';

import { eventRoutes } from './routes/eventRoutes.js';
import { contactRoutes } from './routes/contactRoutes.js';
import errorHandler from './middleware/errorMiddelware.js';

import cors from 'cors'

let port = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(cors())

app.use('/contacts', contactRoutes);
app.use('/events', eventRoutes);

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});