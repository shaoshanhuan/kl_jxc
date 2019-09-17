<template>
    <div class="tiao">
        <Row>
            <Col :span="2">
                <b>{{c}}</b>：
            </Col>
            <Col :span="15">
                <span v-for="item in os" :key="item" class="mspan" @click="clickHan(item)" :class="{'cur': nowChooseArr.includes(item)}">
                    {{item}}
                </span>
            </Col>
            <Col :span="2">
                <Button type="primary" v-show="!isDX" @click="isDX = true">多选</Button>
                <Button type="success" v-show="isDX" @click="okHan">确定</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['c', 'os', 'v', 'changeD', 'k'],
    data () {
        return {
            // 是否多选
            isDX: false,
            nowChooseArr: []
        };
    },
    methods: {
        clickHan (item) {
            if (this.isDX) {
                // 当前是多选模式
                // 如果已经在了，删除
                if (this.nowChooseArr.includes(item)) {
                    this.nowChooseArr = this.nowChooseArr.filter(_item => _item !== item);
                } else {
                    // 如果不在，添加！
                    this.nowChooseArr.push(item);
                }
            } else {
                // 当前不是多选
                this.v.push(item);
            }
        },
        okHan () {
            // 调用父亲的函数，直接替换
            this.changeD(this.k, this.nowChooseArr);
        }
    }
};
</script>

<style scoped>
    .tiao{
        padding:10px;
        font-size:14px;
    }
    .mspan{
        margin-right: 10px;
        cursor: pointer;
        padding:4px 6px;
    }
    .mspan:hover{
        background: #eee;
    }
    .mspan.cur{
        background-color: orange;
        color: white;
    }
</style>
