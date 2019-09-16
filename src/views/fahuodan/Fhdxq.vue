<template>
    <div>
        <h1>我是发货单详情 - {{id}}</h1>
        <MyView :arr="arr" />
    </div>
</template>

<script>
import axiosInstance from '../../http/axiosInstance';
import MyView from './MyView';
export default {
    components: {
        MyView
    },
    created () {
        this.id = this.$route.params.id;
        // 发出Ajax
        axiosInstance.get('http://192.168.2.250:7729/purchitem?listid=' + this.id).then(data => {
            this.results = data.data.results;
        });
    },
    data () {
        return {
            id: 0,
            results: []
        };
    },
    computed: {
        // 转为MyView需要的arr形式
        arr () {
            // 空数组
            let _arr = [];
            // 遍历数组
            for (let i = 0; i < this.results.length; i++) {
                // 遍历_arr，看有没想项name相同
                // 假设没人相同
                let isHave = false;
                for (let j = 0; j < _arr.length; j++) {
                    // 遍历_arr，看有没想项name相同
                    if (_arr[j].pname === this.results[i].pname) {
                        isHave = true;
                        _arr[j].factory.push({ 'fname': this.results[i].pfactory, 'fcount': this.results[i].pnumber });
                    }
                }
                if (!isHave) {
                    _arr.push({
                        'pname': this.results[i].pname,
                        'factory': [{ 'fname': this.results[i].pfactory, 'fcount': this.results[i].pnumber }]
                    });
                }
            }
            return _arr;
        }
    }
};
</script>

<style lang="less" scoped>

</style>
