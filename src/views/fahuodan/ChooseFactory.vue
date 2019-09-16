<template>
    <div class="cf">
        <Row style="height:40px;">
            <Col :span="3"><b>品名</b></Col>
            <Col :span="21">{{nowp.name}}</Col>
        </Row>
        <Row v-for="f in nowp.factory" :key="f" style="height:40px;">
            <Col :span="3"><b>工厂{{f}}</b></Col>
            <Col :span="6">
                <InputNumber :value="getv(f)" @on-change="changeHan(f, $event)" />
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['nowp', 'arr'],
    data () {
        return {
            mydata: {}
        };
    },
    methods: {
        getv (f) {
            // 遍历arr数组，看哪个数据的pname和nowp的name相同，
            // 再遍历这个项的factory属性，把fname和f相同的项的fcount返回就行了
            for (let i = 0; i < this.arr.length; i++) {
                if (this.arr[i].pname === this.nowp.name) {
                    // 遍历工厂
                    for (let j = 0; j < this.arr[i].factory.length; j++) {
                        if (this.arr[i].factory[j].fname === f) {
                            this.mydata[this.arr[i].factory[j].fname] = this.arr[i].factory[j].fcount;
                            return this.arr[i].factory[j].fcount;
                        }
                    }
                }
            }
            // 默认返回0
            return 0;
        },
        changeHan (f, v) {
            this.mydata[f] = v;
        }
    }
};
</script>

<style lang="less" scoped>
    .cf{
        font-size:16px;
    }
</style>
