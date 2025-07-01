
import express from 'express';
import { eventRoutes } from './routes/eventRoutes.js';
import { personRoutes } from './routes/personRoutes.js';
import cors from 'cors'

let port = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(cors())

app.use('/contacts', personRoutes);
app.use('/events', eventRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});