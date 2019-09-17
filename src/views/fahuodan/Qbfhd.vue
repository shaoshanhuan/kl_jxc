<template>
    <div style="position:relative">
        <Row>
            <Col :span="2">
                <b>电商筛选：</b>
            </Col>
            <Col :span="3">
                <Select>
                    <Option value="不限">不限</Option>
                    <Option value="哈哈">哈哈</Option>
                    <Option value="哈哈">哈哈</Option>
                </Select>
            </Col>
            <Col :span="2" :offset="1">
                <b>时间段：</b>
            </Col>
            <Col :span="7">
                <DatePicker :clearable="true" type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>
            </Col>
            <Col :span="8">
                <Button class="btn">最近三个月</Button>
                <Button class="btn">最近半年</Button>
                <Button class="btn">最近一年</Button>
            </Col>
        </Row>
        <div style="color:red">拉取全部电商名字，接口是http://192.168.2.250:7729/shops</div>
        <div style="color:red">筛选器接口是：http://192.168.2.250:7729/purchlist?page=1&shop=当当网&time=1568620645000to1568690998000</div>
        <div class="h20"></div>
        <Spin fix v-show="isSpin"></Spin>
        <h3>共找到0条收货单</h3>
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
            axiosInstance.get('http://192.168.2.250:7729/purchlist?' + querystring.stringify({
                page: this.page
            })).then(data => {
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
    .btn{
        margin-right:10px;
    }
</style>
