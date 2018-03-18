import knex from '../db';

class songsModel {
    async addSong(json, url) {
        const data = JSON.stringify(json);
        console.log(json.items[0].snippet);
        const songAdded = await knex('songs')
         .insert({
             url: `https://www.youtube.com/embed/${json.items[0].id}`,
             title: json.items[0].snippet.title,
             data,
             addedDate: new Date(),
             duration: json.items[0].contentDetails.duration,
             thumbnails: json.items[0].snippet.thumbnails.default.url,
         })
         .catch(err => {
            console.error(err);
          });
        return songAdded;
    };

    async getSong(id) {
        const song = await knex('songs')
        .select()
        .where('id', id)
        .catch(err => console.log(err));
        const requestSong = song.map(item => {
            const songData = JSON.parse(item.data);
            return {
                id: item.id,
                title: item.title,
                url: item.url,
                added: item.addedDate,
                thumbnails: songData.items[0].snippet.thumbnails.default,
            }
        })
        return requestSong[0];
    }
    async getAllSongs() {
        const song = await knex('songs')
        .select()
        .catch(err => console.log(err));
        const requestSong = song.map(item => {
            const songData = JSON.parse(item.data);
            return {
                id: item.id,
                title: item.title,
                url: item.url,
                added: item.addedDate,
                thumbnails: songData.items[0].snippet.thumbnails.default,
                duration: item.duration,
            }
        });
        return requestSong;
    }
};

const SongsModel = new songsModel;
export default SongsModel;