import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import iview from 'iview';

Vue.config.productionTip = false;

Vue.use(iview);

Vue.prototype.$bus = new Vue({
    data: {}
});

// 后置守卫
router.afterEach((to, from) => {
    // 当用户切换路由的时候，告诉全局store
    // console.log(to, from);
    if (to.meta.c1) {
        store.commit('routerStore/changeC1', { 'c1': to.meta.c1 });
    }
    if (to.meta.c2) {
        store.commit('routerStore/changeC2', { 'c2': to.meta.c2 });
    }
    if (to.meta.c3) {
        store.commit('routerStore/changeC3', { 'c3': to.meta.c3 });
    }
    store.commit('routerStore/changeSuoshu', { 'suoshu': to.meta.suoshu });
    store.commit('routerStore/changeName', { 'name': to.name });
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
