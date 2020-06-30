<template>
   <form class="form" v-on:submit.prevent="onSubmit" >
        <div class="input-field">
            <label for="username">Username</label>
            <input type="text"
                name="username"
            >
            <span class="helper-text" data-error="Username must not be empty"></span>
        </div>
        <div class="input-field">
            <label for="password">Password</label>
            <input type="password"
                name="password"
            >
            <span class="helper-text" data-error="Password must not be empty"></span>
        </div>
        <button type="submit" class="waves-effect waves-light btn">
            Login
        </button>
    </form> 
</template>

<script>
import UserService from '../UserService';
const userService = new UserService();
export default {
    name: "Login",
    data(){
        return {
            users: [],
            username: '',
            password: ''
        }
    },
    methods: {
        onSubmit(){
            // this.loading = true;
            // if(!this.validForm()){
            //     this.loading = false;
            //     return;
            // }
              const user = {
                  username: this.username,
                  password: this.password
              };

              userService
                .getUsers(0)
            //     .then(res => {
            //         this.loading = false;
            //         this.entry = "";
            //         this.title = "";
            //         this.$emit('postCreated', res.data);
            //     })
            //     .catch(err => console.error(err));
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