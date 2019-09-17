<template>
    <div style="position:relative">
        <Row>
            <Col :span="2">
                <b>电商筛选：</b>
            </Col>
            <Col :span="3">
                <Select v-model="shop">
                    <Option value="不限">不限</Option>
                    <Option v-for="item in allshops" :key="item" :value="item">
                        {{item}}
                    </Option>
                </Select>
            </Col>
            <Col :span="2" :offset="1">
                <b>时间段：</b>
            </Col>
            <Col :span="7">
                <DatePicker :clearable="true" v-model="timerange_datebanben" type="daterange" placeholder="Select date and time" style="width: 300px"></DatePicker>
            </Col>
            <Col :span="8">
                <Button class="btn" @click="btnHan(3)">最近三个月</Button>
                <Button class="btn" @click="btnHan(6)">最近半年</Button>
                <Button class="btn" @click="btnHan(12)">最近一年</Button>
            </Col>
        </Row>
        <div class="h20"></div>
        <Spin fix v-show="isSpin"></Spin>
        <h3>共找到{{total}}条收货单</h3>
        <Table :columns="columns" :data="data" />
        <div class="h20"></div>
        <Page :total="total" :current="page" @on-change="changePage"/>
    </div>
</template>

<script>
import axiosInstance from '../../http/axiosInstance';
import moment from 'moment';
import querystring from 'querystring';
export default {
    created () {
        this.loadData();

        // 发出Ajax请求
        axiosInstance.get('http://192.168.2.250:7729/shops').then(data => {
            this.allshops = data.data.shops.map(item => item.name);
        });
    },
    data () {
        return {
            data: [],
            total: 0,
            page: 1,
            isSpin: false,
            allshops: [],
            shop: '不限',
            timerange: [],
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
    computed: {
        timerange_datebanben: {
            get () {
                return this.timerange.map(item => new Date(item));
            },
            set (v) {
                if (v[0] === '' || v[1] === '') {
                    this.timerange = [];
                } else {
                    // 把自己的data中的timerange变回时间戳版本
                    this.timerange = v.map(item => Date.parse(item));
                }
                // 回到第1页
                this.page = 1;
                // 拉取数据
                this.loadData();
            }
        }
    },
    methods: {
        // 拉数据的这里要处理
        loadData () {
            this.isSpin = true;
            axiosInstance.get('http://192.168.2.250:7729/purchlist?' + querystring.stringify({
                page: this.page,
                shop: this.shop === '不限' ? '' : this.shop,
                time: this.timerange.length === 0 ? '' : this.timerange.join('to')
            })).then(data => {
                this.data = data.data.results;
                this.total = data.data.total;
                this.isSpin = false;
            });
        },
        changePage (v) {
            this.page = v;
            this.loadData();
        },
        btnHan (m) {
            let today = new Date();
            this.timerange = [Date.parse(new Date(today.getFullYear(), today.getMonth() - m, today.getDate())) + 86400000 - 1, Date.parse(today) + 86400000 - 1];
        }
    },
    watch: {
        shop (v) {
            this.page = 1;
            this.loadData();
        }
    }
};
</script>

<style lang="less" scoped>
    .h20{
        height:20px;
    }
    .btn{
        margin-right:10px;
    }
</style>
