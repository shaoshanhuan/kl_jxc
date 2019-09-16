<template>
    <div class="dsi">
        <Row :gutter="16">
            <Col :span="6" v-for="item in shops" :key="item.name">
                <div class="grid" @click="$emit('changeShop', item.name)">
                    <img :src="`http://192.168.2.250:7729/shoplogo/${item.pic}`" />
                    <p>
                        {{item.name}}
                    </p>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import axiosInstance from '../../http/axiosInstance';
export default {
    data () {
        return {
            shops: []
        };
    },
    created () {
        axiosInstance.get('shops').then(data => {
            this.shops = data.data.shops;
        });
    }
};
</script>

<style lang="less" scoped>
    .grid{
        border:1px solid #ccc;
        margin-bottom: 10px;
        height: 100px;
        text-align: center;
        position: relative;
        line-height: 170px;
        overflow: hidden;
        cursor: pointer;
        text-align: center;
        &:hover{
            border-color:orange;
        }
        img{
            position: absolute;
            top:40%;
            left:50%;
            max-width: 80%;
            max-height: 80%;
            transform:translate(-50%, -50%);
        }
    }
    .dsi{
        padding: 10px;
        width: 600px;
        height: 300px;
        overflow-y: scroll;
    }
</style>
