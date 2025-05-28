import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import addressRoutes from './routes/addressRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use(addressRoutes)

app.get('/', (_: Request, res: Response) => {
    res.send('Guarantors API is running...')
})

export default app;