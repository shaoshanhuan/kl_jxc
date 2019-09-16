import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/basic',
            component: () => import('./views/layouts/Basic.vue'),
            children: [
                {
                    path: 'index',
                    name: 'index',
                    meta: {
                        // meta表示额外信息，now就是它所属的栏目
                        suoshu: 'index',
                        c1: '首页'
                    },
                    component: () => import('./views/index/Index.vue')
                },
                {
                    path: 'dingdan',
                    component: () => import('./views/layouts/LR.vue'),
                    name: 'dingdan',
                    meta: {
                        suoshu: 'dingdan',
                        meta: {
                            suoshu: 'dingdan',
                            c1: '首页',
                            c2: '订单'
                        }
                    },
                    redirect: {
                        // 默认子栏目
                        name: 'qbdd'
                    },
                    children: [
                        {
                            path: 'qbdd',
                            name: 'qbdd',
                            meta: {
                                suoshu: 'dingdan',
                                c1: '首页',
                                c2: '订单',
                                c3: '全部订单'
                            },
                            component: () => import('./views/dingdan/Quanbudingdan.vue')
                        },
                        {
                            path: 'zjdd',
                            name: 'zjdd',
                            meta: {
                                suoshu: 'dingdan',
                                c1: '首页',
                                c2: '订单',
                                c3: '增加订单'
                            },
                            component: () => import('./views/dingdan/Zengjiadingdan.vue')
                        }
                    ]
                },
                {
                    path: 'wuliu',
                    component: () => import('./views/layouts/LR.vue'),
                    name: 'wuliu',
                    meta: {
                        suoshu: 'wuliu',
                        meta: {
                            suoshu: 'wuliu',
                            c1: '首页',
                            c2: '物流'
                        }
                    },
                    redirect: {
                        // 默认子栏目
                        name: 'qbwl'
                    },
                    children: [
                        {
                            path: 'qbwl',
                            name: 'qbwl',
                            meta: {
                                suoshu: 'wuliu',
                                c1: '首页',
                                c2: '物流',
                                c3: '全部物流'
                            },
                            component: () => import('./views/wuliu/Quanbuwuliu.vue')
                        },
                        {
                            path: 'wlcx',
                            name: 'wlcx',
                            meta: {
                                suoshu: 'wuliu',
                                c1: '首页',
                                c2: '物流',
                                c3: '物流查询'
                            },
                            component: () => import('./views/wuliu/Wuliuchaxun.vue')
                        }
                    ]
                },
                {
                    path: 'fahuodan',
                    component: () => import('./views/layouts/LR.vue'),
                    name: 'fahuodan',
                    meta: {
                        suoshu: 'fahuodan',
                        meta: {
                            suoshu: 'fahuodan',
                            c1: '首页',
                            c2: '发货单'
                        }
                    },
                    redirect: {
                        // 默认子栏目
                        name: 'zjfhd'
                    },
                    children: [
                        {
                            path: 'zjfhd',
                            name: 'zjfhd',
                            meta: {
                                suoshu: 'fahuodan',
                                c1: '首页',
                                c2: '发货单',
                                c3: '增加发货单'
                            },
                            component: () => import('./views/fahuodan/Zjfhd.vue')
                        },
                        {
                            path: 'qbfhd',
                            name: 'qbfhd',
                            meta: {
                                suoshu: 'fahuodan',
                                c1: '首页',
                                c2: '发货单',
                                c3: '全部发货单'
                            },
                            component: () => import('./views/fahuodan/Qbfhd.vue')
                        },
                        {
                            path: 'xiangqing/:id',
                            name: 'fhdxq',
                            meta: {
                                suoshu: 'fahuodan',
                                c1: '首页',
                                c2: '发货单',
                                c3: '全货单详情'
                            },
                            component: () => import('./views/fahuodan/Fhdxq.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            component: () => import('./views/login/Login.vue')
        },
        {
            path: '*',
            redirect: {
                name: 'index'
            }
        }
    ]
});
