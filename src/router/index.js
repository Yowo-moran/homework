import VueRouter from "vue-router";

import login from '../pages/login.vue';
import apply from '../pages/apply.vue';
import management from '../pages/management.vue';

const router = new VueRouter({
    routes:[
        {
            name:'login',
            path:'/login',
            component:login,
        },
        {
            name:'apply',
            path:'/',
            component:apply,
        },
        {
            name:'management',
            path:'/management',
            component:management,
        }
    ]
});


export default router;