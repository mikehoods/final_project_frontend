<template>
    <div>
    <h3>Welcome to your diary</h3>
    <div class="row">
        <div class="col s6" v-for="(post, index) in posts"
         v-bind:item="post"
         :index="index"
         :key="post.id">
            <div class="card">
                <div class="card-content">
                    <p class="card-title">{{ post.title }}</p>
                    <p class="timestamp">{{ post.created_at }}</p>
                    <p>{{ post.entry }}</p>
                    <p>{{ post.image }}</p>
                </div>
                <div>
                    <a href='#'>Edit</a>
                    <a href='#' class="delete-btn">Delete</a>
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
            posts: []
        }
    },
    created(){
        postService.getAllPosts()
        .then(res => {
            this.posts = res.data.objects;
            console.log(this.posts);
        })
        .catch(err => console.error(err))
    }
}
</script>

<style scoped>
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