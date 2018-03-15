// user Controller
import Boom from 'boom';
import SongsModel from '../models/songsModel';
import YoutubeFetcher from '../utils/youtubeFetcher';

const youtubeApi = 'https://www.googleapis.com/youtube/v3/videos?id=';
const key = 'AIzaSyDu1nzbma-b_vkLfLb5IgtlJgv9kpCX2rw';

class songsController {
    async getSong(songId) {
      const song = await SongsModel.getSong(songId);
      return song; 
    };

    async getAllSongs() {
        console.log('controller')
        const songs = await SongsModel.getAllSongs();
        return songs; 
    };

    async addSong(url) {
        const fetchYoutubeObject = await YoutubeFetcher.fetcher(url);
        const songAdded = await SongsModel.addSong(fetchYoutubeObject, url);
        return songAdded;
    }
}
const SongsController = new songsController;
export default SongsController;
