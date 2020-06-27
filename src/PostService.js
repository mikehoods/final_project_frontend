import axios from 'axios';

const apiBaseUrl = 'http://localhost:8000';

export default class PostService{
    getAllPosts(){
        return axios.get(`${apiBaseUrl}/api/entry`)
    }
}