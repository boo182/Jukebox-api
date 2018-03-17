// songs Routes.js
const Boom = require('boom');
import express from 'express';
import SongsController from '../controllers/songsController'


const router = express.Router();

router.get('/:id', async (req, res) => {
    const song = await SongsController.getSong(req.params.id);
    res.json(song);
});

router.get('/allSongs', async (req, res) => {
    const songs = await SongsController.getAllSongs();
    res.json(songs);
});

export default router; 