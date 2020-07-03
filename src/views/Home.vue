<template>
    <div>
    <h3>Welcome to your journal</h3>
    <h4>{{ $auth.user.nickname }}</h4>
    <div class="button-block">
        <button v-if="!$auth.isAuthenticated" @click="login" class="button is-xl is-dark">Sign Up to Browse Events</button>
        <h3 v-if="$auth.isAuthenticated" class="is-size-3 has-background-dark welcome">Welcome, {{ $auth.user.name }}!</h3>
    </div>
    <div class="row">
        <!-- <div class="col s3">
            <p>Limit number of posts</p>
            <input type="number" v-model="postLimit">
            <button @click="setLimit()" class="waves-effect waves-light btn">
                Set
            </button>
        </div> -->
    </div>
    <div class="row">
        <div 
        class="col s6" 
        v-for="(post, index) in posts"
        v-bind:item="post"
        :index="index"
        :key="post._id">
            <div class="card">
                <div class="card-content">
                    <p class="card-title">
                        <router-link :to="{path: `${post._id}`}">{{ post.title }}</router-link></p>
                    <p class="timestamp">{{ post.created_at | formatDate }}</p>
                    <p>{{ post.body }}</p>
                    <p>{{ post.img }}</p>
                </div>
                <div>
                    <router-link :to="{path: `${post._id}/edit`}">Edit</router-link> 
                    <a href='#' class="delete-btn" @click='deletePost(post._id)'>Delete</a>
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
        }
    },
    // created(){
        
    //     postService.getAllPosts()
    //     .then(res => {
    //         this.posts = res.data.objects;
    //     })
    //     .catch(err => console.error(err))
    // },
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
.button-block {
    display: flex;
    justify-content: flex-end;
}
.card {
    border-radius: 12px;
    padding: .4rem;
}
.card .card-content .card-title{
    margin-bottom: 0;
}
.card .card-content p.timestamp{
    color: #999;
    margin-bottom: 1rem;
}
.delete-btn {
    color: red;
}
</style>