import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import NewEntry from './views/NewEntry.vue';
import EditEntry from './views/EditEntry.vue';
import ShowEntry from './views/ShowEntry.vue';
// import Login from './views/Login.vue';
// import Register from './views/Register.vue';
import { authGuard } from "./auth/authGuard";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            name: Home
        },
        // {
        //     path: '/login',
        //     component: Login
        // },
        // {
        //     path: '/register',
        //     component: Register
        // },
        {
            path: '/new_entry',
            component: NewEntry,
            beforeEnter: authGuard
        },
        {
            path: '/:id/edit',
            component: EditEntry,
            name: EditEntry,
            beforeEnter: authGuard
        },
        {
            path: '/:id',
            component: ShowEntry,
            name: ShowEntry,
            beforeEnter: authGuard
        }
    ]
})