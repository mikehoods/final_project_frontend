<template>
    <div>
    <h3 v-if="!$auth.user.nickname">Please sign in to access your journal.</h3>
    <h3 v-if="$auth.user.nickname">Welcome to your journal {{ $auth.user.nickname }}</h3>
    <!-- <div class="button-block">
        <button v-if="!$auth.isAuthenticated" @click="login" class="button is-xl is-dark">Sign Up to Browse Events</button>
        <h3 v-if="$auth.isAuthenticated" class="is-size-3 has-background-dark welcome">Welcome, {{ $auth.user.name }}!</h3>
    </div> -->
    <!-- <div class="row">
        <div class="col s3">
            <p>Limit number of posts</p>
            <input type="number" v-model="postLimit">
            <button @click="setLimit()" class="waves-effect waves-light btn">
                Set
            </button>
        </div>
    </div> -->
    <div class="row">
        <div 
        class="col s8 offset-s2" 
        v-for="(post, index) in posts"
        v-bind:item="post"
        :index="index"
        :key="post._id">
            <div class="card hoverable">
                <div class="card-content">
                    <p class="card-title">
                        <router-link :to="{path: `${post._id}`}">{{ post.title }}</router-link></p>
                    <p class="timestamp">{{ post.createdAt | formatDate }}</p>
                    <p>{{ post.body }}</p>
                    <p>{{ post.img }}</p>
                </div>
                <div class="entry-buttons">
                    <router-link :to="{path: `${post._id}/edit`}"><i class="material-icons">edit</i></router-link> 
                    <a href='#' class="delete-btn" @click='deletePost(post._id)'><i class="material-icons">delete</i></a>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import PostService from '../PostService';
const postService = new PostService();
export default {
    name: "Home",
    data(){
        return {
            posts: [],
            postLimit: 5,
            editingPost: null,
        }
    },
    methods: {
        addPost(post) {
            this.posts.unshift(post);
        },
        editPost(post) {
            this.editingPost = post;
        },
        async deletePost(id) {
            const accessToken = await this.$auth.getTokenSilently()
            postService
                //deletes post from array
                .deletePost(id, accessToken)
                .then(() => {
                    // filters post from FE view
                    this.posts = this.posts.filter(p => p._id !== id);
                })
                .catch(err => console.error(err));
        },
        setLimit(){
            postService.getPosts(this.postLimit)
                .then(res => this.posts = res.data)
                .catch(err => console.error(err));
        },
        logout() {
            localStorage.removeItem('auth-token')
        }
    },
    beforeCreate(){
        // const username = await this.$auth.user.nickname
        postService.getAllPosts()
        .then(res => {
            this.posts = res.data;
            this.posts = this.posts.reverse()
            // this.posts = this.posts.filter(this.posts.username != this.$auth.user.nickname)
        })
        .catch(err => console.error(err))
    },
    filters: {
        formatDate(date){
            date = new Date(date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `${month}/${day}/${year}`
        }
    },
    watch: {
            editingPost(post){
                this.title = post.title;
                this.body = post.body;
            }
        }
}
</script>

<style>
h3 {
    font-family: 'Federo', sans-serif;
    text-align: center;
}
.button-block {
    display: flex;
    justify-content: flex-end;
}
.card {
    border-radius: 12px;
    padding: .4rem;
    font-family: 'EB Garamond', serif;
}
.card .card-content .card-title{
    margin-bottom: 0;
}
.card .card-content .card-title a {
    color: black;
}
.card .card-content p.timestamp{
    color: #999;
    margin-bottom: 1rem;
}
.entry-buttons {
    display: flex;
    justify-content: flex-end;
}
.delete-btn {
    color: rgb(126, 36, 36);
}
</style>