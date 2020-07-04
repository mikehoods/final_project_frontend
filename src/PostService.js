import axios from 'axios';

const apiBaseUrl = 'http://localhost:3000/entries';

export default class PostService{
    getAllPosts(token){
        return axios.get(`${apiBaseUrl}/`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
    }
    getPosts(id, accessToken){
        return axios.get(`${apiBaseUrl}/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
    }

    writePost(post, accessToken){
        if(post._id){
            return axios.put(`${apiBaseUrl}/${post._id}/`, {
              post: post,
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
        } else return axios.post(`${apiBaseUrl}/`, {
            post: post,
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
    }

    deletePost(id, accessToken){
        return axios.delete(`${apiBaseUrl}/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
    }
}