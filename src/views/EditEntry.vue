<template>
    <form v-if="!loading" class="form" v-on:submit.prevent="onSubmit" >
        <div class="input-field">
            <label for="title" class="active">Title</label>
            <input type="text"
                name="title"
                v-model="title"
                :class="[errors.title ? 'invalid' : 'validate']"
            >
            <span class="helper-text" data-error="Title must not be empty"></span>
        </div>
        <div class="input-field">
            <label for="body" class="active">Body</label>
            <vue-editor v-model="body" :editorToolbar="customToolbar"></vue-editor>
            <span class="helper-text" data-error="Body must not be empty"></span>
        </div>
        <button type="submit" class="waves-effect waves-light btn">
            Edit
        </button>
    </form>
    <div class="progress" v-else-if="loading">
        <div class="indeterminate"></div>
    </div>
</template>

<script>
import PostService from '../PostService';
const postService = new PostService();
import { VueEditor } from "vue2-editor";
export default {
    name: "EditEntry",
    components: {
        VueEditor
    },
    data() {
        return {
            loading: false,
            title: "",
            body: "",
            id: "",
            errors: {},
            posts: [],
            customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
        //['link', 'image','video']                                  
  ],
        };
    },
    beforeCreate(){
        postService.getPosts(this.$route.params.id)
        .then(response => {
            this.posts = response.data;
            this.title = this.posts.title;
            this.body = this.posts.body;
            this.id = this.posts._id;
        })
    },
    methods: {
        onSubmit(){
            this.loading = true;
            if(!this.validForm()){
                this.loading = false;
                return;
            }
              const post = {
                  title: this.title,
                  body: this.body,
                  _id: this.id
              };

              postService
                .writePost(post)
                .then(res => {
                    this.loading = false;
                    this.body = "";
                    this.title = "";
                    this.id = "";
                    this.$emit('postCreated', res.data);
                    this.$router.push('/');
                })
                .catch(err => console.error(err));
        },
        validForm(){
            this.errors = {};
            if(this.title.trim() === ""){
                this.errors.title = 'Title Required'
            }
            if(this.body.trim() === ""){
                this.errors.body = 'Body Required'
            }
            if(Object.keys(this.errors).length > 0){
                return false;
            } else return true;
        },
        
    }
}
</script>
<style scoped>
.form {
    margin: 2rem auto;
}
.progress {
    margin: 5rem auto;
}
textarea {
    height: 40vh;
}
</style>