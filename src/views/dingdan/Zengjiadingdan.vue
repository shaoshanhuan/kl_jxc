<template>
    <div>
        <div class="content">
            <h1>增加订单</h1>
            <Form ref="myform" :model="myform" :rules="rules" :label-width="120">
                <FormItem label="姓名" prop="name">
                    <Input v-model="myform.name" placeholder="请输入您的姓名"></Input>
                </FormItem>
                <FormItem label="电话" prop="tel">
                    <Input v-model="myform.tel" placeholder="请输入您的电话"></Input>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            myform: {},
            rules: {
                'name': [
                    { 'required': true, 'message': '必须输入中文姓名', trigger: 'blur' },
                    { 'pattern': /^[\u4E00-\u9FA5]{2,4}$/, 'message': '您的姓名不合法' }
                ],
                'tel': [
                    { 'required': true, 'message': '必须输入电话', trigger: 'blur' },
                    { 'pattern': /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, 'message': '您的手机号不合法' }
                ]
            }
        };
    }
};
</script>

<style lang="less" scoped>
    .content{
        width:800px;
    }
</style>
