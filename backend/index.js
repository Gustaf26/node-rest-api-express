
import express from 'express';
import { eventRoutes } from './routes/eventRoutes.js';
import { personRoutes } from './routes/personRoutes.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())

app.use('/contacts', personRoutes);
app.use('/events', eventRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});