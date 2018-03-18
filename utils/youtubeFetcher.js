const Boom = require('boom');
import axios from 'axios';
import { URL } from 'url';
require('dotenv').config();


const youtubeApi = 'https://www.googleapis.com/youtube/v3/videos?id=';
const key = process.env.YT_KEY;

class youtubeFetcher {
    async fetcher(url) {
        try {
            const myURL = new URL(url);
            const param = myURL.searchParams.get('v');
            const answer = axios.get(`${youtubeApi}${param}&part=snippet,ContentDetails&key=${key}`)
            .then(res => res.data);
            console.log(answer);
            return answer;
        } catch(error) {
            return Boom.badRequest(error.message);
        }
    }
}

const YoutubeFetcher = new youtubeFetcher;
export default YoutubeFetcher;
