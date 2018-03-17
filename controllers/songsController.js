// user Controller
const Boom = require('boom');
import SongsModel from '../models/songsModel';
import YoutubeFetcher from '../utils/youtubeFetcher';


class songsController {
    async getSong(songId) {
      const song = await SongsModel.getSong(songId);
      return song; 
    };

    async getAllSongs() {
        const songs = await SongsModel.getAllSongs();
        return songs; 
    };

    async addSong(url) {
        const fetchYoutubeObject = await YoutubeFetcher.fetcher(url);
        console.log(fetchYoutubeObject);
        const songAdded = await SongsModel.addSong(fetchYoutubeObject, url);
        return songAdded;
    }
}
const SongsController = new songsController;
export default SongsController;
