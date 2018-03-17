// search Routes.js
const Boom = require('boom');
import express from 'express';
import SearchController from '../controllers/searchController'


const router = express.Router();

router.get('/:value', async (req, res) => {
    const songs = await SearchController.getSongs(req.params.value);
    res.json(songs);
});

export default router; 