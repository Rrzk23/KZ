import 'dotenv/config.js';
import express, { NextFunction, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { isHttpError } from 'http-errors';
import {sessionMiddleware} from './middlewares/session';
import adminRoutes from './routes/adminRoute';
import projectRoutes from './routes/projectRoute';
import { requireAuth } from './middlewares/auth';


const app = express();
app.use(express.json());

app.use(sessionMiddleware);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}
));

app.use(morgan('dev'));

app.use('/api/admin', adminRoutes);
app.use('/api/projects', requireAuth, projectRoutes);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = 'an unknown error occurred';
    let statuscode = 500;
    if (isHttpError(error)) {
      statuscode = error.status;
      errorMessage = error.message;
    }
    console.error(error);
    res.status(statuscode).json({ error: errorMessage });
  });

export default app;