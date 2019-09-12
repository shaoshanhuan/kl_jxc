<template>
    <div class="cki">
        <Row>
            <Col>
                <p class="back" @click="$emit('clearShop')"><Icon type="ios-arrow-back" />重新选择电商</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <p class="sheng" v-for="item in chuxianguodeSheng" :key="item" @click="keyword=item">
                    {{item}}
                </p>
            </Col>
        </Row>
        <Row>
            <Input v-model="keyword" />
        </Row>
        <Row>
            <Col>
                <div class="bb_list">
                    <div class="tiao" v-for="item in filtedStorehouse" :key="item.name" @click="$emit('chooseCangku', {
                            'name': item.name,
                            'tel': item.tel,
                            'manager': item.manager
                        })"
                    >
                        {{item.name}}
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import axiosInstance from '../../http/axiosInstance';
export default {
    props: ['shop'],
    data () {
        return {
            storehouse: [],
            chuxianguodeSheng: [],
            keyword: ''
        };
    },
    created () {
        axiosInstance.get('storehouse?shop=' + this.shop).then(data => {
            this.storehouse = data.data.storehouse;
            // 对省份进行分析
            // 中国全部省份名字
            const allSheng = ['北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省', '台湾', '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'];
            // 在你的storehouse里面出现过的省份名字
            let chuxianguodeSheng = [];
            allSheng.forEach(item => {
                for (let j = 0; j < this.storehouse.length; j++) {
                    if (this.storehouse[j].name.includes(item)) {
                        chuxianguodeSheng.push(item);
                        return;
                    }
                }
            });
            this.chuxianguodeSheng = chuxianguodeSheng;
        });
    },
    computed: {
        // 被过滤之后的仓库
        filtedStorehouse () {
            return this.storehouse.filter(item => (new RegExp(this.keyword, 'g')).test(item.name));
        }
    }
};
</script>

<style lang="less" scoped>
    .cki{
        padding: 10px;
        width: 600px;
        height: 300px;
    }
    .back{
        color : #2d8cf0;
        cursor: pointer;
    }
    .sheng{
        float: left;
        margin-right:10px;
        color: #2d8cf0;
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
    .ivu-row{
        padding: 4px 0;
    }
    .bb_list{
        height: 120px;
        overflow-y: scroll;
        font-size:16px;
        .tiao{
            width: 390px;
            line-height: 24px;
            cursor: pointer;
            padding-left: 10px;
            margin: 6px 0;

            &:hover{
                background: gold;
            }
        }
    }
</style>
