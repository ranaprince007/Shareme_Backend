import express from 'express'
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import pinsRouter from './routes/pins.js'
import multer from 'multer';
import cors from 'cors'


export const app = express();
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
const corsOptions = {
    origin: process.env.FRONTEND_URI, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };

app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(upload.any())

app.use('/api/v1/user', userRouter);
app.use('/api/v1/pins', pinsRouter);
