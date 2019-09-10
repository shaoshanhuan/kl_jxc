<template>
    <div class="wrap">
        <div class="inner">
            我是登录页面
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="less" scoped>
    .wrap{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:-webkit-linear-gradient(top left, #308fe1, #184d9d);

        @w: 500px;
        @h: 300px;
        .inner{
            position: absolute;
            width: @w;
            height: @h;
            background:white;
            top:50%;
            left:50%;
            margin-left:-@w/2;
            margin-top:-@h/2;
        }
    }
</style>
