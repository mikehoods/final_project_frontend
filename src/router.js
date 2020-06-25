import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import NewEntry from './views/NewEntry.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/new_entry',
            component: NewEntry
        }
    ]
})