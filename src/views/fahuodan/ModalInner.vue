<template>
    <div>
        <Tabs value="健康坚果">
            <TabPane v-for="(v, k) in obj" :key="k" :label="k" :name="k">
                <div class="ovs">
                    <Row :gutter="16">
                        <Col :span="4" v-for="item in obj[k]" :key="item.name">
                            <div class="grid">
                                <p>
                                    <img :src="`http://192.168.2.250:7729/productpics/${item.pic}`"/>
                                </p>
                                <p>
                                    {{item.name}}
                                </p>
                                <p style="color:red;">
                                    {{howCount(item.name)}}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import axiosInstance from '../../http/axiosInstance';
export default {
    data () {
        return {
            obj: {},
            arr: [
                {
                    'pname': '果脯菠萝片',
                    'factory': [{ 'fname': 'A', 'fcount': 8 }, { 'fname': 'A', 'fcount': 2 }]
                },
                {
                    'pname': '办公室玉米花',
                    'factory': [{ 'fname': 'G', 'fcount': 5 }]
                }
            ]
        };
    },
    created () {
        axiosInstance.get('product').then(data => {
            this.obj = data.data.products;
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
        }
    }
};
</script>

<style lang="less" scoped>
    .ovs{
        height: 300px;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-top:20px;
        padding-right:20px;
    }
    .grid{
        height: 170px;
        margin-bottom: 16px;
        border: 1px solid #ccc;
        img{
            width:100%;
        }
    }
</style>
