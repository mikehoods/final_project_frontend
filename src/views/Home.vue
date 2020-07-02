<template>
    <div>
    <h3>Welcome to your journal</h3>
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
            token: null
        }
    },
    methods: {
        addPost(post) {
            this.posts.unshift(post);
        },
        editPost(post) {
            this.editingPost = post;
        },
        deletePost(id) {
            postService
                //deletes post from array
                .deletePost(id)
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
    created(){
        const checkToken = JSON.parse(window.localStorage.getItem('auth-token'))
        if (checkToken) {
            this.token = checkToken
        }
        postService.getAllPosts()
        .then(res => {
            this.posts = res.data.objects;
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