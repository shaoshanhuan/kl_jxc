<template>
    <div>
        <h1>{{info.brand}}{{info.series}}的图集</h1>
        <div v-if="info.images !== undefined">
            <vue-picture-swipe :items="viewArr"></vue-picture-swipe>
        </div>
    </div>
</template>

<script>
import axiosInstance from '../../http/axiosInstance';
import VuePictureSwipe from 'vue-picture-swipe';
export default {
    components: {
        VuePictureSwipe
    },
    created () {
        const id = this.$route.params.id;
        axiosInstance.get('http://192.168.2.250:3000/car/' + id).then(data => {
            this.info = data.data.result;
        });
    },
    data () {
        return {
            'info': {}
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
        }
    }
};
</script>

<style lang="less" scoped>
    img{
        margin-right: 10px;
    }
</style>
