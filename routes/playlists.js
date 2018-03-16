// songs sRoutes.js
const Boom = require('boom');
import express from 'express';
import PlaylistController from '../controllers/playlistController';


const router = express.Router();

router.get('/', async (req, res) => {
    const playlist = await PlaylistController.getPlaylist();
    res.json(playlist);
})

router.post('/add', async (req, res) => {
    const newSong = await PlaylistController.addSongToPlaylist(req.body.song, req.body.songPosition);
    res.json(newSong);
});

router.delete('/:id/:playlistName', async (req, res) => {
    const deleteSong = await PlaylistController.deleteFromPlaylist(req.params.id, req.params.playlistName);
    res.json(deleteSong);
});

router.get('/saveCurrent/:playlistName', async(req, res) => {
    const savedPlaylist = await PlaylistController.saveCurrentPlaylist(req.params.playlistName);
    return res.json(savedPlaylist);
});

router.post('/addToPlaylist', async(req, res) => {
    const playlist = await PlaylistController.addSongToSavedPlaylist(req.body.song, req.body.playlist, req.body.songPosition);
    return res.json(playlist);
})



export default router; 