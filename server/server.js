import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './router/auth-router.js';
import notesRouter from './router/notes-router.js';
import connectdb from './Utils/db.js'; 

const app = express();


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://primetrade-ai1-2.onrender.com'],
  methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
}));

app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);


const PORT = 8000;
 connectdb().then(() => {
     app.listen(PORT, () => {
         console.log(`server is started on port ${PORT}`);
     });
 })
