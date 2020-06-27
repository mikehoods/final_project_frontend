<template>
    <form v-if="!loading" class="form" v-on:submit.prevent="onSubmit">
        <div class="input-field">
            <label for="title">Title</label>
            <input type="text"
                name="title"
                v-model="title"
                class="validate"
            >
            <span class="helper-text" data-error="Title must not be empty"></span>
        </div>
        <div class="input-field">
            <label for="entry">Entry</label>
            <input type="text"
                name="entry"
                v-model="entry"
                class="entry"
            >
            <span class="helper-text" data-error="Title must not be empty"></span>
        </div>
        <button type="submit" class="waves-effect waves-light btn">
            Add
        </button>
    </form>
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
        };
    },
    methods: {
        onSubmit(){
            this.loading = true;
              const post = {
                  title: this.title,
                  entry: this.entry
              };

              postService
                .writePost(post)
                .then(res => {
                    this.loading = false;
                    console.log(res.data);
                })
                .catch(err => console.error(err));
        }
    }
}
</script>
<style scoped>
.form {
    margin: 2rem auto;
}
</style>