<template>
    <div>
        <h3>Create New User</h3>
        <form class="form" v-if="!loading" v-on:submit.prevent="onSubmit" >
            <div class="input-field">
                <label for="username">Username</label>
                <input type="text"
                    name="username"
                    autofocus="autofocus"
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
                Register
            </button>
        </form>
        <div class="progress" v-else-if="loading">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>

<script>
import UserService from '../UserService';
const userService = new UserService();
export default {
    name: "Login",
    data(){
        return {
            users: [],
            loading: false,
            username: '',
            password: '',
            errors: {},
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

              userService
                .createUser(user)
                .then(res => {
                    this.loading = false;
                    this.password = "";
                    this.username = "";
                    this.$emit('userCreated', res.data);
                    history.go('/login')
                })
                .catch(err => console.error(err));
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