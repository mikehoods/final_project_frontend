<template>
    <div>
        <div class="card" v-bind:item="posts">
            <div class="card-content">
                <p class="card-title">{{ this.posts.title }}</p>
                <p class="timestamp">{{ this.posts.createdAt | formatDate }}</p>
                <p>{{ this.posts.body }}</p>
                <p>{{ this.posts.img }}</p>
            </div>
            <div>
                <router-link :to="{path: `${this.posts._id}/edit`}">Edit</router-link> 
                <a href='/' class="delete-btn" @click='deletePost(posts._id)'>Delete</a>
            </div>
        </div>
    </div>
</template>

<script>
import PostService from '../PostService';
const postService = new PostService();
export default {
    name: 'ShowEntry',
    data(){
        return {
            posts: [],
            token: null
        }
    },
    beforeCreate(){
        const checkToken = JSON.parse(window.localStorage.getItem('auth-token'))
        if (checkToken) {
            this.token = checkToken
        }
        postService.getPosts(this.$route.params._id)
        .then(response => this.posts = response.data)
    },
    methods: {
        deletePost(id) {
            postService.deletePost(id)
        },
    },
    filters: {
        formatDate(date){
            date = new Date(date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `${month}/${day}/${year}`
        }
    }
}
</script>