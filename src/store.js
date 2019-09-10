import Vue from 'vue';
import Vuex from 'vuex';
import routerStore from './stores/routerStore.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        routerStore
    }
});
