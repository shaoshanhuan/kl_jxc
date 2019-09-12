<template>
    <div style="">
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu :active-name="$store.state.routerStore.name" theme="light" width="auto" @on-select="selectHan">
                    <div v-show="$store.state.routerStore.suoshu === 'dingdan'" >
                        <MenuItem name="qbdd">全部订单</MenuItem>
                        <MenuItem name="zjdd">增加订单</MenuItem>
                    </div>
                    <div v-show="$store.state.routerStore.suoshu === 'wuliu'" >
                        <MenuItem name="qbwl">全部物流</MenuItem>
                        <MenuItem name="wlcx">物流查询</MenuItem>
                    </div>
                    <div v-show="$store.state.routerStore.suoshu === 'fahuodan'" >
                        <MenuItem name="zjfhd">增加发货单</MenuItem>
                        <MenuItem name="qbfhd">全部发货单</MenuItem>
                    </div>
                </Menu>
            </Sider>
            <Layout :style="{padding: '0 24px 24px'}">
                <Breadcrumb :style="{margin: '24px 0'}">
                    <BreadcrumbItem>{{$store.state.routerStore.c1}}</BreadcrumbItem>
                    <BreadcrumbItem>{{$store.state.routerStore.c2}}</BreadcrumbItem>
                    <BreadcrumbItem>{{$store.state.routerStore.c3}}</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
export default {
    methods: {
        selectHan (name) {
            this.$router.push({
                name
            });
        }
    }
};
</script>

<style lang="less" scoped>

</style>
