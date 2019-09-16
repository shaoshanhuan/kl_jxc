<template>
    <div class="minner">
        <Spin fix v-show="isShowSpin"></Spin>
        <Tabs value="健康坚果">
            <TabPane v-for="(v, k) in obj" :key="k" :label="(h) => labelHan(h, k)" :name="k">
                <div class="ovs">
                    <Row :gutter="16">
                        <Col :span="4" v-for="item in obj[k]" :key="item.name">
                            <div class="grid" @click="showModal(item)">
                                <p>
                                    <img :src="`http://192.168.2.250:7729/productpics/${item.pic}`"/>
                                </p>
                                <p>
                                    {{item.name}}
                                </p>
                                <p class="infoc">
                                    {{howCount(item.name)}}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
        </Tabs>

        <Modal v-model="isShowModal" title="选择工厂和数量">
            <ChooseFactory :nowp="nowp" :arr="arr"/>
        </Modal>
    </div>
</template>

<script>
import ChooseFactory from './ChooseFactory.vue';
import axiosInstance from '../../http/axiosInstance';
import _ from 'lodash';
export default {
    data () {
        return {
            // 是否显示菊花
            isShowSpin: true,
            // 是否显示更小的弹出层
            isShowModal: false,
            // 服务器返回的产品清单
            obj: {},
            // 当前正在点击的这个东西数据
            nowp: {},
            arr: [
                {
                    'ptype': '果干蜜饯',
                    'pname': '果脯菠萝片',
                    'factory': [{ 'fname': 'A', 'fcount': 8 }, { 'fname': 'A', 'fcount': 2 }]
                },
                {
                    'ptype': '饼干膨化',
                    'pname': '办公室玉米花',
                    'factory': [{ 'fname': 'G', 'fcount': 5 }]
                },
                {
                    'ptype': '果干蜜饯',
                    'pname': '蔓越莓干',
                    'factory': [{ 'fname': 'B', 'fcount': 3 }, { 'fname': 'E', 'fcount': 3 }, { 'fname': 'F', 'fcount': 5 }]
                }
            ]
        };
    },
    created () {
        // Ajax
        axiosInstance.get('product').then(data => {
            // 回调
            this.obj = data.data.products;
            // 隐藏菊花
            this.isShowSpin = false;
        });
    },
    methods: {
        howCount (pname) {
            // 假设是0
            let fcount = 0;
            let pcount = 0;
            // 遍历
            for (let i = 0; i < this.arr.length; i++) {
                if (this.arr[i].pname === pname) {
                    fcount = this.arr[i].factory.length;
                    // 遍历它的factory
                    for (let j = 0; j < this.arr[i].factory.length; j++) {
                        pcount += this.arr[i].factory[j].fcount;
                    }
                }
            }
            if (pcount === 0) {
                return '';
            }
            return '共' + fcount + '工厂，共' + pcount + '箱';
        },
        labelHan (h, k) {
            return h('Badge', {
                attrs: {
                    count: this.typeCount[k]
                }
            }, k);
        },
        showModal (item) {
            this.nowp = item;
            this.isShowModal = true;
        }
    },
    computed: {
        // 统计数量
        typeCount () {
            return _.countBy(this.arr, 'ptype');
        }
    },
    components: {
        ChooseFactory
    }
};
</script>

<style lang="less">
    .minner{
        position: relative;
        min-height:200px;
        .ovs{
            height: 300px;
            overflow-x: hidden;
            overflow-y: scroll;
            padding-top:20px;
            padding-right:20px;
        }
        .grid{
            height: 150px;
            margin-bottom: 16px;
            border: 1px solid #ccc;
            position: relative;
            img{
                width:100%;
            }
        }
        .infoc{
            font-size:12px;
            color:yellow;
            background:red;
            position: absolute;
            right:0px;
            top:0px;
        }
        .ivu-tabs-nav .ivu-tabs-tab{
            padding: 12px 4px 7px;
        }
        .ivu-tabs-ink-bar .ivu-tabs-ink-bar-animated{
            width: 63px;
        }
    }
</style>
