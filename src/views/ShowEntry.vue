<template>
    <div>
        <h1>Show Entry</h1>
        <div class="card">
            <div class="card-content">
                <p class="card-title">{{ this.post.title }}</p>
                <p class="timestamp">{{ this.post.created_at | formatDate }}</p>
                <p>{{ this.post.entry }}</p>
                <p>{{ this.post.image }}</p>
            </div>
            <div>
                <router-link to="edit_entry">Edit</router-link> 
                <a href='/' class="delete-btn" @click='deletePost(this.post.id)'>Delete</a>
            </div>
        </div>
    </div>
</template>

<script>
import PostService from '../PostService';
const postService = new PostService();
export default {
    name: 'ShowEntry',
    params: ['post'],
    data(){
        return {
            post: []
        }
    },
    beforeCreate(){
        postService.getPosts(this.$route.params.id)
        .then(response => this.post = response.data)
    },
    deletePost(id) {
        postService
            .deletePost(id)
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