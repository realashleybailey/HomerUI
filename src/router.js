import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/Dashboard.vue'),
    },
    {
        path: '/add-service',
        name: 'AddApp',
        component: () => import('./views/AddService.vue'),
        meta: { auth: true },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('./views/Settings.vue'),
        meta: { auth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('./views/Login.vue'),
        meta: { auth: false },
    },
    {
        // Catch all 404
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('./views/NotFound.vue'),
    }
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

// If route has meta.auth, check if user is authenticated
router.beforeEach((to, from, next) => {
    if (to.meta.auth && !store.getters.isLoggedIn) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

// If route has meta.auth false, check if user is authenticated and redirect to dashboard if true
router.beforeEach((to, from, next) => {
    if (to.meta.auth === false && store.getters.isLoggedIn) {
        next({ name: 'Home' });
    } else {
        next();
    }
});

export default router;