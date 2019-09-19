<template>
    <div class="wrap">
        <Fuxuankuang c="颜色" :os="['红', '橙', '黄', '绿', '蓝', '紫', '黑', '白', '灰']" :v="color" v-if="color.length === 0" :changeD="changeD" k="color"/>
        <Fuxuankuang c="排放" :os="['国一', '国二', '国三', '国四', '国五']" :v="exhaust" v-if="exhaust.length === 0" :changeD="changeD" k="exhaust"/>
        <Fuxuankuang c="燃料" :os="['汽油', '柴油', '油电混合', '纯电动']" :v="fuel" v-if="fuel.length === 0" :changeD="changeD" k="fuel" />

        <Tag @on-close="color = []" v-show="color.length !== 0" closable color="primary">颜色：{{color.join(' 或 ')}}</Tag>
        <Tag @on-close="exhaust = []" v-show="exhaust.length !== 0" closable color="primary">排放：{{exhaust.join(' 或 ')}}</Tag>
        <Tag @on-close="fuel = []" v-show="fuel.length !== 0" closable color="primary">燃料：{{fuel.join(' 或 ')}}</Tag>
        <h3>共{{total}}辆车</h3>
        <Table :data="data" :columns="columns" />
        <div class="h20"></div>
        <Page :total="total" :page-size="10" :current="page" @on-change="changePage"/>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Fuxuankuang from './Fuxuankuang.vue';
import querystring from 'querystring';

export default {
    data () {
        return {
            // 当前页码
            page: 1,
            // 总数
            total: 0,
            // 服务器返回的数据
            data: [],
            // 颜色筛选
            color: [],
            // 排放筛选
            exhaust: [],
            // 燃料筛选
            fuel: [],
            // 列定义
            columns: [
                {
                    title: '图片',
                    render: (h, { row }) => {
                        return h('div', [
                            h('img', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            'name': 'tuji',
                                            'params': {
                                                'id': row.id
                                            }
                                        });
                                    }
                                },
                                attrs: {
                                    'class': 'tutu',
                                    'src': `http://192.168.2.250:3000/images/carimages_small/${row.id}/view/${row.image}`
                                }
                            })
                        ]);
                    },
                    width: 200
                },
                { title: '编号', key: 'id', width: 90 },
                { title: '品牌', key: 'brand' },
                { title: '车系', key: 'series' },
                { title: '颜色', key: 'color' },
                { title: '售价', key: 'price' },
                { title: '公里数', key: 'km' },
                { title: '发动机排量', key: 'engine' },
                {
                    title: '购买日期',
                    render (h, { row }) {
                        return h('div', moment(row.buydate).format('YYYY-MM-DD'));
                    },
                    width: 120
                },
                { title: '排放标准', key: 'exhaust' },
                { title: '变速箱类型', key: 'gearbox' },
                { title: '燃料类型', key: 'fuel' }
            ]
        };
    },
    created () {
        this.loadData();
    },
    methods: {
        // 改变页码
        changePage (page) {
            this.page = page;
            this.loadData();
        },
        // 直接替换整个数据
        changeD (k, v) {
            this[k] = v;
        },
        // 拉取数据
        loadData () {
            // Ajax
            axios.get('http://192.168.2.250:3000/car?' + querystring.stringify({
                'page': this.page,
                'color': this.color.join('v'),
                'exhaust': this.exhaust.join('v'),
                'fuel': this.fuel.join('v')
            })).then(data => {
                this.data = data.data.results;
                this.total = data.data.total;
            });
        }
    },
    components: {
        Fuxuankuang
    },
    watch: {
        color () {
            this.loadData();
        },
        exhaust () {
            this.loadData();
        },
        fuel () {
            this.loadData();
        }
    }
};
</script>

<style lang="less">
    .h20{
        height: 20px;
    }
    .tutu{
        cursor: pointer;
    }
</style>
