<template>
    <div style="position:relative">
        <Spin fix v-show="isSpin"></Spin>
        <Table :columns="columns" :data="data" />
        <div class="h20"></div>
        <Page :total="total" :current="page" @on-change="changePage"/>
    </div>
</template>

<script>
import axiosInstance from '../../http/axiosInstance';
import moment from 'moment';
export default {
    created () {
        this.loadData();
    },
    data () {
        return {
            data: [],
            total: 0,
            page: 1,
            isSpin: false,
            columns: [
                { 'title': '发货单编号', 'key': 'id' },
                { 'title': '发往的电商', 'key': 'shop' },
                { 'title': '发往的仓库', 'key': 'storage' },
                { 'title': '涉及物品数量', 'key': 'thingamount' },
                {
                    'title': '时间',
                    render (h, { row }) {
                        return h('div', moment(Number(row.time)).format('YYYY-MM-DD HH:MM:SS'));
                    }
                },
                {
                    'title': '查看详情',
                    'render': (h, { row }) => {
                        return h('Button', {
                            attrs: {
                                type: 'primary'
                            },
                            on: {
                                click: () => {
                                    // 路由跳转
                                    this.$router.push({
                                        name: 'fhdxq',
                                        params: {
                                            'id': row.id
                                        }
                                    });
                                }
                            }
                        }, '查看详情');
                    }
                }
            ]
        };
    },
    methods: {
        loadData () {
            this.isSpin = true;
            axiosInstance.get('http://192.168.2.250:7729/purchlist?page=' + this.page).then(data => {
                this.data = data.data.results;
                this.total = data.data.total;
                this.isSpin = false;
            });
        },
        changePage (v) {
            this.page = v;
            this.loadData();
        }
    }
};
</script>

<style lang="less" scoped>
    .h20{
        height:20px;
    }
</style>
