export default {
    namespaced: true,
    state: {
        // 所属栏目
        suoshu: '',
        name: '',
        c1: '',
        c2: '',
        c3: ''
    },
    mutations: {
        changeSuoshu (state, { suoshu }) {
            state.suoshu = suoshu;
        },
        changeName (state, { name }) {
            state.name = name;
        },
        changeC1 (state, { c1 }) {
            state.c1 = c1;
        },
        changeC2 (state, { c2 }) {
            state.c2 = c2;
        },
        changeC3 (state, { c3 }) {
            state.c3 = c3;
        }
    },
    actions: {
    }
};
