import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
    res.send('Guarantors API is running...')
})

export default app;