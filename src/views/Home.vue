<template>
    <div>
    <h3 class="home-heading" v-if="!$auth.user.nickname">Please sign in to access your journal.</h3>
    <h3 class="home-heading" v-if="$auth.user.nickname">Welcome to your journal {{ $auth.user.nickname }}</h3>
    <!-- <button @click="showPosts()">Show Posts</button> -->
    <div class="row">
        <div
        class="col s12 m8 offset-m2" 
        v-for="(post, index) in posts"
        v-bind:item="post"
        :index="index"
        :key="post._id"
        >
            <div class="card hoverable">
                <div class="card-content">
                    <p class="card-title">
                        <router-link :to="{path: `${post._id}`}">{{ post.title }}</router-link></p>
                    <p class="timestamp">{{ post.createdAt | formatDate }}</p>
                    <p  v-html="post.body"></p>
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
    data() {
        return {
            posts: [],
            editingPost: null,
            user: this.$auth.user.nickname
        }
    },
    methods: {
        // showPosts() {
        // // this.user = this.$auth.user.nickname
        // const user = this.user
        // console.log(user)
        // postService.getAllPosts(user)
        // .then(res => {
        //     console.log(user)
        //     this.posts = res.data;
        //     this.posts = this.posts.reverse();
        // })
        // .catch(err => console.error(err))
        // },
        addPost(post) {
            this.posts.unshift(post);
        },
        editPost(post) {
            this.editingPost = post;
        },
        async deletePost(id) {
            const accessToken = await this.$auth.getTokenSilently();
            postService
                //deletes post from array
                .deletePost(id, accessToken)
                .then(() => {
                    // filters post from FE view
                    this.posts = this.posts.filter(p => p._id !== id);
                })
                .catch(err => console.error(err));
        }
    },
    created() {
        this.user = this.$auth.user.nickname
        console.log(this.user)
        postService.getAllPosts(this.user)
        .then(res => {
            console.log(this.user)
            this.posts = res.data;
            this.posts = this.posts.reverse();
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
.home-heading h3 {
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
}
.card .card-content .card-title{
    margin-bottom: 0;
    font-family: 'EB Garamond', serif;
}
.card .card-content .card-title a {
    color: black;
}
.card .card-content p.timestamp{
    color: #999;
    margin-bottom: 1rem;
    font-family: 'EB Garamond', serif;
}
.entry-buttons {
    display: flex;
    justify-content: flex-end;
}
.delete-btn {
    color: rgb(126, 36, 36);
}
</style>