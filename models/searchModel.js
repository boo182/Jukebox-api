import knex from '../db';
const Boom = require('boom');

class searchModel {

    async getSongs(value) {
        const songs = await knex('songs')
        .select('id', 'title')
        .where('title', 'like', `%${value}%`)
        .catch(err => Boom.badRequest(err.message));

        return songs;
    }
};

const SearchModel = new searchModel;
export default SearchModel;