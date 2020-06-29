import axios from 'axios';

const apiBaseUrl = 'http://localhost:8000/api/entry/';

export default class PostService{
    getAllPosts(){
        return axios.get(`${apiBaseUrl}`)
    }

    getPosts(number){
        return axios.get(`${apiBaseUrl}${number}`)
    }

    writePost(post){
        if(post.id){
            return axios.put(`${apiBaseUrl}${post.id}`, post)
        } else return axios.post(`${apiBaseUrl}`, post)
    }

    deletePost(id){
        return axios.delete(`${apiBaseUrl}${id}`)
    }
}