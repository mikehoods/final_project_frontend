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
            posts: []
        }
    },
    created(){
        postService.getAllPosts()
            .then(res => {
                this.posts = res.data
                console.log(this.posts);
            })
            .catch(err => console.error(err));
    }
}
</script>