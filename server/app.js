import express from 'express';
import cors from 'cors';
import connect from './models/index.js';
import api from './routes/index.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use('/api', api);
connect();

app.use(morgan('combined'));

app.use(function (err, _, res, __) {
  res.status(500).json({ ok: false, message: err.message });
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
