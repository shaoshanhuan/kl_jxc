<template>
    <div class="cf">
        <Row style="height:40px;">
            <Col :span="3"><b>品名</b></Col>
            <Col :span="21">{{nowp.name}}</Col>
        </Row>
        <Row v-for="rr in nowp.factory" :key="rr" style="height:40px;">
            <Col :span="3"><b>工厂{{rr}}</b></Col>
            <Col :span="6">
                <Input type="number" />
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: ['nowp', 'arr']
};
</script>

<style lang="less" scoped>
    .cf{
        font-size:16px;
    }
</style>
