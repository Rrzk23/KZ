import 'dotenv/config.js';
import express, { NextFunction, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';


const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}
));

app.use(morgan('dev'));


app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = 'an unknown error occurred';
    let statuscode = 500;
    if (isHttpError(error)) {
      statuscode = error.status;
      errorMessage = error.message;
    }
    console.error('Test Error:', error);
    res.status(statuscode).json({ error: errorMessage });
  });

export default app;