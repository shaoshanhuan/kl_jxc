<template>
    <div class="sp">
        <Spin fix v-if="!isDone" />
        <img :src="src" v-if="isDone" >
    </div>
</template>

<script>
export default {
    props: ['src'],
    data () {
        return {
            isDone: false
        };
    },
    created () {
        this.show();
    },
    watch: {
        src () {
            this.show();
        }
    },
    methods: {
        show () {
            this.isDone = false;
            // 创建小图
            let img = new Image();
            // 设置路径
            img.src = this.src;
            // 当加载完毕显示
            img.onload = () => {
                this.isDone = true;
            };
        }
    }
};
</script>

<style lang="less">
    .sp{
        min-height: 90px;
        position: relative;
        img{
            width:100%;
        }
    }
    .ivu-spin-fix{
        background:none;
    }
</style>
