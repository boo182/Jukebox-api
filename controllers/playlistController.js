// user Controller
const Boom = require('boom');
import PlaylistModel from '../models/playlistModel';
import SongModel from '../models/songsModel';
import axios from 'axios';
import { URL } from 'url';
import YoutubeFetcher from '../utils/youtubeFetcher';


class playlistController {

    async addSongToPlaylist(url, songPosition) {
      const song = await YoutubeFetcher.fetcher(url);
      if(song.isBoom === true) {
          return song;
      }
      const addedSong = await PlaylistModel.addSongToPlaylist(url, song, songPosition);
      return addedSong; 
    };

    async getPlaylist() {
        const playlist = await PlaylistModel.getPlaylist();
        return playlist;
    }

    async deleteFromPlaylist(songId, playlistName) {
        if(playlistName === 'current') {
            const deletedSong = await PlaylistModel.deleteFromPlaylist(songId, playlistName);
            return deletedSong;
        }
        const deletedSong = await PlaylistModel.deleteFromSavedPlaylist(songId, playlistName);
        return deletedSong;
    }

    async saveCurrentPlaylist(playlistName) {
        const playlist = await PlaylistModel.getPlaylist();

        const ids = playlist.map(item => {
            return {
                playlistName,    
                songId: item.songId,
                songPosition: item.songPosition,
            };
        });
        await PlaylistModel.saveCurrentPlaylist(ids, playlistName);
        const savedPlaylist = await PlaylistModel.getPlaylistByName(playlistName);
        return savedPlaylist;
    }
    async addSongToSavedPlaylist(song, playlistName, songPosition) {
        const checkIfSongIsInPlaylist = await PlaylistModel.checkIfSongIsInPlaylist(song, playlistName);
        const checkIfSongExists = await SongModel.getSong(song);
        if(checkIfSongIsInPlaylist === true && checkIfSongExists !== null){
            return Boom.unauthorized('bad Request');
        }
        const savedPlaylist = await PlaylistModel.addSongToSavedPlaylist(song, playlistName, songPosition);
        return savedPlaylist;
    }  
}
const PlaylistController = new playlistController;
export default PlaylistController;
