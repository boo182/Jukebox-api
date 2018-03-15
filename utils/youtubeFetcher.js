import Boom from 'boom';
import axios from 'axios';
import { URL } from 'url';
import { youtubeAPIKey } from '../env';

const youtubeApi = 'https://www.googleapis.com/youtube/v3/videos?id=';
const key = youtubeAPIKey;


class youtubeFetcher {
    async fetcher(url) {
        console.log(url);
        try {
            const myURL = new URL(url);
            const param = myURL.searchParams.get('v');
            const answer = axios.get(`${youtubeApi}${param}&part=snippet,ContentDetails&key=${key}`)
            .then(res => res.data);
            return answer;
        } catch(error) {
            return Boom.badRequest(error.message);
        }
    }
}

const YoutubeFetcher = new youtubeFetcher;
export default YoutubeFetcher;
