import axios from 'axios';

const apiBaseUrl = 'http://localhost:3000/users/';

export default class UserService{
    login(loginUser){
        return axios.post(`${apiBaseUrl}login/`, loginUser)
    }
    getAllUsers(){
        return axios.get(`${apiBaseUrl}`)
    }

    getUser(number){
        return axios.get(`${apiBaseUrl}${number}`)
    }

    createUser(user){
        if(user.id){
            return axios.put(`${apiBaseUrl}${user.id}/`, user)
        } else return axios.post(`${apiBaseUrl}register`, user)
    }

    deleteUser(id){
        return axios.delete(`${apiBaseUrl}${id}`)
    }
}