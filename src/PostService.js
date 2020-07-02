import axios from 'axios';

const apiBaseUrl = 'http://localhost:3000/entries';

export default class PostService{
    getAllPosts(){
        return axios.get(`${apiBaseUrl}/`)
    }

    getPosts(number){
        return axios.get(`${apiBaseUrl}/${number}`)
    }

    writePost(post){
        if(post._id){
            return axios.put(`${apiBaseUrl}/${post._id}/`, post)
        } else return axios.post(`${apiBaseUrl}/`, post)
    }

    deletePost(id){
        return axios.delete(`${apiBaseUrl}/${id}`)
    }
}