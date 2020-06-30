import axios from 'axios';

const apiBaseUrl = 'http://localhost:8000/users/v1/';

export default class UserService{
    getAllUsers(){
        return axios.get(`${apiBaseUrl}`)
    }

    getUsers(number){
        return axios.get(`${apiBaseUrl}${number}`)
    }

    createUser(user){
        if(user.id){
            return axios.put(`${apiBaseUrl}${user.id}/`, user)
        } else return axios.post(`${apiBaseUrl}`, user)
    }

    deleteUser(id){
        return axios.delete(`${apiBaseUrl}${id}`)
    }
}