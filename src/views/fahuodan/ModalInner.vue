<template>
    <div class="minner">
        <Spin fix v-show="isShowSpin"></Spin>
        <Tabs value="健康坚果">
            <TabPane v-for="(v, k) in obj" :key="k" :label="(h) => labelHan(h, k)" :name="k">
                <div class="ovs">
                    <Row :gutter="16">
                        <Col :span="4" v-for="item in obj[k]" :key="item.name">
                            <div class="grid" @click="showModal(item, k)">
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

        <Modal v-model="isShowModal" title="选择工厂和数量" @on-ok="onHan">
            <ChooseFactory v-if="isShowModal" :nowp="nowp" :arr="arr" ref="cf" />
        </Modal>
    </div>
</template>

<script>
import ChooseFactory from './ChooseFactory.vue';
import axiosInstance from '../../http/axiosInstance';
import _ from 'lodash';
export default {
    props: ['arr'],
    data () {
        return {
            // 是否显示菊花
            isShowSpin: true,
            // 是否显示更小的弹出层
            isShowModal: false,
            // 服务器返回的产品清单
            obj: {},
            // 当前正在点击的这个东西数据
            nowp: {}
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
                    // 遍历它的factory
                    for (let j = 0; j < this.arr[i].factory.length; j++) {
                        if (this.arr[i].factory[j].fcount !== 0) {
                            fcount++;
                        }
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
        showModal (item, k) {
            this.nowp = item;
            // 给nowp补一个属性
            this.nowp.ptype = k;
            this.isShowModal = true;
        },
        onHan () {
            let mydata = this.$refs.cf.mydata;
            // 得到子组件中的数据
            // 遍历自己的this.arr，看谁的pname等于nowp的name
            // 如果都没有匹配的，就要this.arr数组中增加一项
            // 如果有匹配的，就要遍历这一项的factory数组，用this.$refs.cf.mydata的值替换它的fcount值
            for (let i = 0; i < this.arr.length; i++) {
                if (this.arr[i].pname === this.nowp.name) {
                    // console.log('找到了' + this.arr[i].pname);
                    // 看看每项是不是都是0，都是0要删除这项
                    // 假设不是
                    let isAllZero = true;
                    Object.values(mydata).forEach(v => {
                        if (v !== 0) {
                            isAllZero = false;
                        }
                    });
                    // 如果都是0，要删除这项
                    if (isAllZero) {
                        this.arr.splice(i, 1);
                    }
                    // 遍历它的factory
                    this.arr[i].factory = Object.keys(mydata).map(fname => ({ 'fname': fname, 'fcount': mydata[fname] }));
                    return;
                }
            }

            // console.log('没有找到' + this.nowp.name);
            // 没有找到，因为找到了的已经return了
            // 要在数组中push一项
            this.arr.push({
                'pprice': this.nowp.price,
                'ptype': this.nowp.ptype,
                'pname': this.nowp.name,
                'factory': Object.keys(mydata).map(fname => ({ 'fname': fname, 'fcount': mydata[fname] }))
            });
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
            padding-top:20px;
            padding-right:20px;
        }
        .grid{
            height: 180px;
            margin-bottom: 16px;
            border: 1px solid #ccc;
            position: relative;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
            &:hover{
                border-color:orange;
            }
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
