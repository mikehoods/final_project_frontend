<template>
   <form class="form" v-if="!loading" v-on:submit.prevent="onSubmit" >
        <div class="input-field">
            <label for="username">Username</label>
            <input type="text"
                name="username"
                v-model="username"
                :class="[errors.username ? 'invalid' : 'validate']"
            >
            <span class="helper-text" data-error="Username must not be empty"></span>
        </div>
        <div class="input-field">
            <label for="password">Password</label>
            <input type="password"
                name="password"
                v-model="password"
                :class="[errors.password ? 'invalid' : 'validate']"
            >
            <span class="helper-text" data-error="Password must not be empty"></span>
        </div>
        <button type="submit" class="waves-effect waves-light btn">
            Login
        </button>
    </form>
    <div class="progress" v-else-if="loading">
        <div class="indeterminate"></div>
    </div>
</template>

<script>
import UserService from '../UserService';
const userService = new UserService();
import Axios from 'axios';
export default {
    name: "Login",
    data(){
        return {
            users: [],
            loading: false,
            username: '',
            password: '',
            errors: {},
            userData: {}
        }
    },
    methods: {
        onSubmit(){
            this.loading = true;
            if(!this.validForm()){
                this.loading = false;
                return;
            }
              const user = {
                  username: this.username,
                  password: this.password
              };
              const loginUser = {username: this.username, password: this.password}
              Axios.post('http://localhost:8000/users/login/', loginUser)
            .then(function (response){
                // console.log(response)
                this.userData = {
                    token: response.data.token 
                };
                localStorage.setItem("auth-token", JSON.stringify(response.data.token));
                })
                .catch(function(error){
                    console.log(error)
                    // setError(true)
                });

              userService
                .getAllUsers()
                .then(res => {
                    this.loading = false;
                    this.users = res.data.objects;
                })
                .catch(err => console.error(err))
            console.log(user)
        },
        validForm(){
            this.errors = {};
            if(this.username.trim() === ""){
                this.errors.username = 'Username Required'
            }
            if(this.password.trim() === ""){
                this.errors.password = 'Password Required'
            }
            if(Object.keys(this.errors).length > 0){
                return false;
            } else return true;
        }
    }
}
</script>