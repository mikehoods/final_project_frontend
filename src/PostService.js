import axios from 'axios';

const apiBaseUrl = 'https://ga-final-project-dear-diary.herokuapp.com/entries';

export default class PostService{
    getAllPosts(token){
        return axios.get(`${apiBaseUrl}/`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
    }

    getPosts(number, token){
        return axios.get(`${apiBaseUrl}/${number}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
    }

    writePost(post, token){
        if(post._id){
            return axios.put(`${apiBaseUrl}/${post._id}/`, {
                headers: {
                    Authorization: `bearer ${token}`
                },
                post})
        } else return axios.post(`${apiBaseUrl}/`, {
            headers: {
                Authorization: `bearer ${token}`
            },
            post})
    }

    deletePost(id, token){
        return axios.delete(`${apiBaseUrl}/${id}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
    }
}