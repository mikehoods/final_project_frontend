<template>
    <div>
    <h3>Welcome to your diary</h3>
    <div class="row">

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
            entries: []
        }
    },
    created(){
        postService.getAllPosts()
    }
}
</script>