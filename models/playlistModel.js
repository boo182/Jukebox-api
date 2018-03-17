import knex from '../db';
import SongModel from './songsModel';
const Boom = require('boom');

class playlistModel {

    async getPlaylist(playlistName) {
        const playlist = await knex
        .select('url', 'title', 'songId', 'duration', 'songPosition', 'playlist', 'thumbnails')
        .from('playlist')
        .innerJoin('songs', 'playlist.songId', 'songs.id')
        .catch(err => Boom.badRequest(err.message));
        return playlist;
    }

    async addSongToPlaylist(url, song, songPosition) {
        const songId = await SongModel.addSong(song, url);
        const songAdded = await knex('playlist')
         .insert({
             playlist: 'current',
             playlistId: 0,
             songId,
             songPosition,
         })
         .catch(err => Boom.badRequest(err.message));
        return await this.getPlaylist();
    };

    async deleteFromPlaylist(songId) {
        const deleteSong = await knex('playlist')
        .delete()
        .where('id', songId)
        .catch(err => Boom.badRequest(err.message));

        return await this.getPlaylist();
    }
    async deleteFromSavedPlaylist(songId, playlistName) {
        const deleteSong = await knex('saved_playlists')
        .delete()
        .where('playlistName', playlistName)
        .where('songId', songId)
        .catch(err => Boom.badRequest(err.message));

        return await this.getPlaylistByName(playlistName);
    }
    async checkPlaylistName(playlistName) {
        const playlistAlreadyExists = await knex('saved_playlists')
        .select('playlistName')
        .where('playlistName', playlistName)
        .catch(err => Boom.badRequest(err.message));

        return playlistAlreadyExists.length !== 0 || false;
    }
    async checkIfSongIsInPlaylist(songId, playlistName) {
        const doesSongExists = await knex('saved_playlists')
        .select()
        .where('playlistName', playlistName)
        .where('songId', songId)
        .catch(err => Boom.badRequest(err.message));
        return doesSongExists.length !== 0 || false;
    }

    async saveCurrentPlaylist(ids, playlistName) {
        const ver = await this.checkPlaylistName(playlistName);
       
        if(ver === true) {
            return Boom.unauthorized('Playlist name already exists');
        } 

        const savedPlaylist = await knex('saved_playlists')
        .insert(ids)
        .catch(err => Boom.badRequest(err.message));
        return savedPlaylist;
    }

    async getPlaylistByName(playlistName) {
        const playlist = await knex
        .select('url', 'title', 'songId', 'duration', 'songPosition', 'playlistName')
        .from('saved_playlists')
        .innerJoin('songs', 'saved_playlists.songId', 'songs.id')
        .where('playlistName', playlistName)
        .catch(err => Boom.badRequest(err.message));

        return playlist;
    }

    async addSongToSavedPlaylist(songId, playlistName, songPosition) {
        const songToAdd = await knex('saved_playlists')
        .insert({playlistName, songId, songPosition})
        .catch(err => Boom.badRequest(err.message));

        const playlist = await this.getPlaylistByName(playlistName);
        return playlist;
    }
};


const PlaylistModel = new playlistModel;
export default PlaylistModel;