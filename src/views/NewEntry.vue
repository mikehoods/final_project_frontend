<template>
    <form v-if="!loading" class="form" v-on:submit.prevent="onSubmit" >
        <div class="input-field">
            <label for="title">Title</label>
            <input type="text"
                name="title"
                v-model="title"
                :class="[errors.title ? 'invalid' : 'validate']"
            >
            <span class="helper-text" data-error="Title must not be empty"></span>
        </div>
        <div class="input-field">
            <label for="entry">Entry</label>
            <input type="text"
                name="entry"
                v-model="entry"
                :class="[errors.entry ? 'invalid' : 'validate']"
            >
            <span class="helper-text" data-error="Entry must not be empty"></span>
        </div>
        <div class="file-field input-field">
      <div class="btn">
        <span>File</span>
        <input type="file">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div>
        <button type="submit" class="waves-effect waves-light btn">
            Add
        </button>
    </form>
    <div class="progress" v-else-if="loading">
        <div class="indeterminate"></div>
    </div>
</template>

<script>
import PostService from '../PostService';
const postService = new PostService();
export default {
    name: "NewEntry",
    data() {
        return {
            loading: false,
            title: "",
            entry: "",
            errors: {},
        };
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
                  entry: this.entry
              };

              postService
                .writePost(post)
                .then(res => {
                    this.loading = false;
                    this.entry = "";
                    this.title = "";
                    this.$emit('postCreated', res.data);
                })
                .catch(err => console.error(err));
        },
        validForm(){
            this.errors = {};
            if(this.title.trim() === ""){
                this.errors.title = 'Title Required'
            }
            if(this.entry.trim() === ""){
                this.errors.entry = 'Entry Required'
            }
            if(Object.keys(this.errors).length > 0){
                return false;
            } else return true;
        }
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
</style>