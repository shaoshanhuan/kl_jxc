<template>
    <div class="wrap_dt">
        <Spin fix v-if="!isDone"/>
        <img :src="src" />
    </div>
</template>

<script>
export default {
    props: ['id', 'xc', 'picname'],
    data () {
        return {
            'src': '',
            'isDone': false
        };
    },
    created () {
        this.show();
    },
    watch: {
        id () {
            this.show();
        },
        xc () {
            this.show();
        },
        picname () {
            this.show();
        }
    },
    methods: {
        show () {
            this.isDone = false;
            // 首先要先显示小图的虚图
            this.src = `http://192.168.2.250:3000/images/carimages_small/${this.id}/${this.xc}/${this.picname}`;
            // 加载大图
            let img = new Image();
            // 设置大图路径
            img.src = `http://192.168.2.250:3000/images/carimages/${this.id}/${this.xc}/${this.picname}`;
            // 当大图加载完毕
            img.onload = () => {
                // 显示大图
                this.src = `http://192.168.2.250:3000/images/carimages/${this.id}/${this.xc}/${this.picname}`;
                // 加载完毕
                this.isDone = true;
            };
        }
    }
};
</script>

<style lang="less" scoped>
    .wrap_dt{
        position: relative;
        height:100%;
        img{
            width:90%;
            height:auto;
            position: absolute;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);
        }
    }
</style>
