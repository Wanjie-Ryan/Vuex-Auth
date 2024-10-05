import RegisterComponent from "@/components/register.vue";
import HomeComponent from "@/components/home.vue";
import LoginComponent from "@/components/login.vue";
import NotFoundComponent from "@/components/notFound.vue";
import AddComponent from "@/components/Add.vue";
import UpdateComponent from "@/components/Update.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: HomeComponent
    },
    {
        path: '/',
        name: 'Register',
        component: RegisterComponent
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/addhotel',
        name: 'Add',
        component: AddComponent
    },
    {
        path: '/updatehotel/:id',
        name: 'Update',
        component: UpdateComponent
    },
    {
        // path: '/:pathMatch(.*)*',
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFoundComponent
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;