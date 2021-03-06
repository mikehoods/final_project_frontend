import axios from 'axios';

const apiBaseUrl = 'https://ga-final-project-dear-diary.herokuapp.com/entries';

export default class PostService{
    getAllPosts(){
        return axios.get(`${apiBaseUrl}/`)
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