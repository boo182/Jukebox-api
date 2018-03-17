// user Controller
const Boom = require('boom');
import SearchModel from '../models/searchModel';

class searchController {
    async getSongs(value) {
        if(value === '') {
            return Boom.badRequest('Bad request');
        }
      const songs = await SearchModel.getSongs(value);
      return songs; 
    };
}
const SearhController = new searchController;
export default SearhController;
