import axios from 'axios';

const apiBaseUrl = 'http://localhost:8000';

export default class PostService{
    getAllPosts(){
        return axios.get(`${apiBaseUrl}/api/entry`)
            .then(results => {
                console.log(results.data.objects)
                return results.data.objects
            })
            .catch(error => console.log(error))
    }
}