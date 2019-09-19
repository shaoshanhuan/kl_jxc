<template>
    <div class="wrap">
        <div class="leftpart">
            <img v-if="info.id" width="400" :src="`http://192.168.2.250:3000/images/carimages/${info.id}/${xc}/${info.images[xc][nowidx]}`" alt="">
            <button @click="gonext">下一张</button>
        </div>
        <div class="rightpart">
            <h1>
                {{info.brand}}{{info.series}}[{{info.id}}]
            </h1>
            <h2>
                {{info.color}}色{{info.engine}}{{info.price}}万元{{info.km | wan(2)}}万公里
            </h2>

            <div class="btns">
                <div class="r">
                    <div @click="changeXc('view')" :class="['btn', {'cur': xc === 'view'}]">外观（{{info.images.view.length}}）</div>
                    <div @click="changeXc('inner')" :class="['btn', {'cur': xc === 'inner'}]">内饰（{{info.images.inner.length}}）</div>
                </div>
                <div class="r">
                    <div @click="changeXc('engine')" :class="['btn', {'cur': xc === 'engine'}]">结构（{{info.images.engine.length}}）</div>
                    <div @click="changeXc('more')" :class="['btn', {'cur': xc === 'more'}]">细节（{{info.images.more.length}}）</div>
                </div>
            </div>

            <div class="smallpics">
                <div class="unit" :style="{'left': -290 * nowpage + 'px'}">
                    <div class="cx" v-for="i in allpages" :key="i">
                        <p @click="changenowidx((i - 1) * 4 + (j - 1))" :class="['tubox', {'cur': (i - 1) * 4 + (j - 1) === nowidx}]" v-for="j in 4" :key="j">
                            <img v-if="(i - 1) * 4 + (j - 1) < info.images[xc].length" :src="`http://192.168.2.250:3000/images/carimages_small/${info.id}/${xc}/${info.images[xc][(i - 1) * 4 + (j - 1)]}`">
                        </p>
                    </div>
                </div>
                <div class="bar">
                    <p v-for="i in allpages" :key="i" :class="{'cur': i - 1 === nowpage}" @click="changeNowPage(i - 1)"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axiosInstance from '../../http/axiosInstance';
export default {
    created () {
        const id = this.$route.params.id;
        axiosInstance.get('http://192.168.2.250:3000/car/' + id).then(data => {
            this.info = data.data.result;
        });
    },
    data () {
        return {
            // 罗列出来，不至于undifined报错了！
            'info': {
                'images': {
                    'view': [],
                    'inner': [],
                    'more': [],
                    'engine': []
                }
            },
            'xc': 'view',
            'nowpage': 0,
            'nowidx': 0
        };
    },
    computed: {
        viewArr () {
            // 形式转换算法
            return this.info.images.view.map(item => ({
                'src': `http://192.168.2.250:3000/images/carimages/${this.info.id}/view/${item}`,
                'thumbnail': `http://192.168.2.250:3000/images/carimages_small/${this.info.id}/view/${item}`,
                'w': 1350,
                'h': 900
            }));
        },
        allpages () {
            return Math.ceil(this.info.images[this.xc].length / 4);
        }
    },
    methods: {
        changeXc (xc) {
            this.xc = xc;
            this.nowidx = 0;
        },
        changeNowPage (nowpage) {
            this.nowpage = nowpage;
        },
        gonext () {
            // 进行判断，看看是不是应该换相册
            if (this.nowidx < this.info.images[this.xc].length - 1) {
                this.nowidx++;
            } else {
                // 到头了
                if (this.xc === 'view') {
                    this.xc = 'inner';
                } else if (this.xc === 'inner') {
                    this.xc = 'engine';
                } else if (this.xc === 'engine') {
                    this.xc = 'more';
                } else if (this.xc === 'more') {
                    this.xc = 'view';
                }
                this.nowidx = 0;
            }
        },
        changenowidx (idx) {
            this.nowidx = idx;
        }
    },
    watch: {
        // 监控nowidx的变化，当nowidx变化之后，让nowpage重新计算变化！
        nowidx () {
            // 计算nowpage
            this.nowpage = Math.floor(this.nowidx / 4);
        }
    }
};
</script>

<style lang="less" scoped>
    .wrap{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:black;
        padding-right:300px;

        .leftpart{
        }

        .rightpart{
            position: absolute;
            right:0;
            top:0;
            width:300px;
            height:100%;
            border-left:1px solid rgb(117, 117, 117);
            color:white;
            padding:10px 10px;
            .btns{
                padding-top: 20px;
                .r{
                    display: flex;
                    padding-top: 6px;

                    .btn{
                        flex:1;
                        height:40px;
                        background:#eee;
                        text-align: center;
                        line-height: 40px;
                        color:#333;
                        font-size:14px;
                        cursor: pointer;

                        &:first-child{
                            margin-right:6px;
                        }

                        &.cur {
                            background:gold;
                            color:#333;
                        }
                    }
                }
            }
            .smallpics {
                padding-top: 20px;
                overflow: hidden;
                .unit {
                    width: 100000px;
                    height: 220px;
                    position: relative;
                    left: 0px;
                    transition: all 0.3s ease 0s;

                    .cx{
                        float:left;
                        width: 280px;
                        height: 220px;
                        margin-right:10px;
                        .tubox{
                            float: left;
                            width: 136px;
                            position: relative;
                            cursor: pointer;
                            &:nth-child(2n + 1){
                                margin-right:6px;
                            }
                            &.cur::before{
                                background:rgba(0,0,0,0);
                            }
                            &::before{
                                content:"";
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                top:0;
                                left:0;
                                background:rgba(0, 0, 0, .6);
                            }
                            img{
                                width:100%;
                            }
                        }
                    }
                }
                .bar{
                    display: flex;
                    p{
                        flex:1;
                        height:10px;
                        background:#eee;
                        margin-right:4px;
                        cursor: pointer;
                        &:last-child{
                            margin-right: 0;
                        }
                        &.cur{
                            background:gold;
                        }
                    }
                }
            }
        }
    }
</style>
