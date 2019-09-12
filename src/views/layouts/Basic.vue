<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="$store.state.routerStore.suoshu" @on-select="selectHan">
                    <div class="layout-logo">
                        考拉进销存<small>V1.0.0</small>
                        {{$store.state.routerStore.now}}
                    </div>
                    <div class="layout-nav">
                        <MenuItem v-for="item in arr" :key="item.name" :name="item.name">
                            {{item.c}}
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content>
                <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>

<script>
export default {
    data () {
        return {
            arr: [
                {
                    'name': 'index',
                    'c': '首页'
                },
                {
                    'name': 'dingdan',
                    'c': '订单'
                },
                {
                    'name': 'fahuodan',
                    'c': '发货单'
                },
                {
                    'name': 'wuliu',
                    'c': '物流'
                }
            ]
        };
    },
    methods: {
        selectHan (name) {
            this.$router.push({
                name: name
            });
        }
    }
};
</script>

<style lang="less" scoped>
    .ivu-menu-dark{
        background: transparent;
    }
    .ivu-layout-header{
        background:-webkit-linear-gradient(top left, #2196F3, #fefefe 8%, #2196F3);
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 506px;
        height: 30px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 0px;
        left: 20px;
        font-size: 37px;
        color: #333;
        text-shadow: -2px -1px 2px white;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;

        li{
            font-size:20px;
        }
    }
    .layout-footer-center{
        text-align: center;
    }
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active{
        background: orange;
    }
</style>
