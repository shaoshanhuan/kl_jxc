import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/haha',
            component: () => import('./components/Haha.vue'),
            children: [
                {
                    path: 'hashiqi',
                    component: () => import('./components/Hashiqi.vue')
                },
                {
                    path: 'haerbin',
                    component: () => import('./components/Haerbin.vue')
                }
            ]
        },
        {
            path: '/xixi',
            component: () => import('./components/Xixi.vue')
        }
    ]
});
