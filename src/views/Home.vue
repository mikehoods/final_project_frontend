<template>
    <div>
    <h3 class="home-heading" v-if="!$auth.user.nickname">Please sign in to access your journal.</h3>
    <h3 class="home-heading" v-if="$auth.user.nickname">Welcome to your journal {{ $auth.user.nickname }}</h3>
    <div class="search">
        <input type="text" v-if="$auth.user.nickname" v-model="search" placeholder="Search your entries (case sensitive)">
    </div>
    <div class="row">
        <div
        class="col s12 m8 offset-m2" 
        v-for="(post, index) in searchFilter"
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
            allPost: [],
            user: this.$auth.user.nickname,
            search: ''
        }
    },
    methods: {
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
    computed: {
        filteredEntries: function() {
            return this.allPosts.filter((post) => {
                return post.username.match(this.$auth.user.nickname)
            })
        },
        searchFilter: function(){
            return this.posts.filter((post) => {
                return post.body.match(this.search)
            })
        }
    },
    beforeCreate() {
        this.user = this.$auth.user.nickname
        postService.getAllPosts(this.user)
        .then(res => {
            this.allPosts = res.data;
            this.allPosts = this.filteredEntries
            this.posts = this.allPosts.reverse();
            
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
    }
}
</script>

<style lang="scss">
.search {
    display: flex;
    justify-content: center;
    margin: 2rem;
    input {
        max-width: 45vw;
    }
}
.home-heading {
    font-family: 'Federo', sans-serif;
    text-align: center;
}
.card {
    border-radius: 12px;
    padding: .4rem;
    ul {
        li {
            list-style: inside;
        }
    }
    .card-content {
        .card-title {
            margin-bottom: 0;
            font-family: 'EB Garamond', serif;
            a {
                color: black;
            }
        }
        p.timestamp {
            color: #999;
            margin-bottom: 1rem;
            font-family: 'EB Garamond', serif;
        }
    }
    .entry-buttons {
        display: flex;
        justify-content: flex-end;
        .delete-btn {
            color: rgb(126, 36, 36);
        }
    }
}
@media only screen and (max-width: 750px) {
    .search {
        input {
            max-width: 75vw;
        }
    }
}
</style>