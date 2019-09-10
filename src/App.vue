<template>
    <div>
        <h1>{{a}}</h1>
        <Button @click="a++" type="primary">加1</Button>
        <DatePicker />
    </div>
</template>

<script>
export default {
    data () {
        return {
            a: 10,
            arr: ['苹果', '鸭梨', '鸭梨']
        };
    }
};
</script>

<style lang="less" scoped>
</style>
