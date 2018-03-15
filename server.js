import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';

const PORT = 5000;
const app = express();
app.use(cors());

// Routes import
//import users from './routes/users';
import songs from './routes/songs';
import playlists from './routes/playlists'


const router = express.Router();

// Body Parser is used to parse POST request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

const options = {
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'jukebox',
};

//app.use('/user', users);
app.use('/songs', songs);
app.use('/playlists', playlists)

app.listen(PORT, () => {
  console.log('CORE API server running on port', PORT);
});


module.exports = app;
