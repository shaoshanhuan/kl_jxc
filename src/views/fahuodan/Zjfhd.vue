<template>
    <div class="wrap_zjfhd" @click="isShowMenu = false">
        <h1>增加发货单</h1>
        <Row>
            <Col :span="3">
                <b>选择电商和仓库</b>
            </Col>
            <Col :span="21">
                <Dropdown placement="bottom-start" trigger="custom" :visible="isShowMenu">
                    <Button @click.stop="isShowMenu = true">
                        {{!cangku.name ? '点击选择...' : shop + ' / ' + cangku.name}}
                    </Button>
                    <div slot="list" class="list" @click.stop="">
                        <DianshangInner v-if="isShowMenu && !shop" @changeShop="shop=$event"/>
                        <CangkuInner v-if="isShowMenu && shop" :shop="shop" @chooseCangku="chooseCangku($event)" @clearShop="shop='';cangku={};" />
                    </div>
                </Dropdown>
            </Col>
        </Row>
        <Row>
            <Col :span="3">
                <b>选择货物</b>
            </Col>
            <Col :span="21">
                <ModalInner :arr="arr" />
            </Col>
        </Row>
        <Row>
            <Col :span="3">
                <b>发货单预览</b>
            </Col>
            <Col :span="21">
                <div v-for="(item, index) in arr" :key="index" class="bbox">
                    <h3><i>{{item.pname}}</i>产品应该由下列工厂发货</h3>
                    <Table :columns="cols" :data="item.factory"></Table>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
import DianshangInner from './DianshangInner';
import CangkuInner from './CangkuInner';
import ModalInner from './ModalInner';

export default {
    components: {
        DianshangInner,
        CangkuInner,
        ModalInner
    },
    data () {
        return {
            'shop': '',
            'cangku': {},
            'isShowMenu': false,
            'cols': [
                { 'title': '工厂名', 'key': 'fname' },
                { 'title': '发货数量', 'key': 'fcount' },
                { 'title': '删除',
                    render (h) {
                        return h('Button', {
                            attrs: {
                                type: 'warning'
                            }
                        }, '删除');
                    }
                }
            ],
            'arr': [
                {
                    'ptype': '果干蜜饯',
                    'pname': '果脯菠萝片',
                    'factory': [{ 'fname': 'A', 'fcount': 18 }, { 'fname': 'C', 'fcount': 2 }]
                },
                {
                    'ptype': '饼干膨化',
                    'pname': '办公室玉米花',
                    'factory': [{ 'fname': 'G', 'fcount': 5 }]
                },
                {
                    'ptype': '果干蜜饯',
                    'pname': '蔓越莓干',
                    'factory': [{ 'fname': 'B', 'fcount': 3 }, { 'fname': 'E', 'fcount': 3 }, { 'fname': 'F', 'fcount': 5 }]
                }
            ]
        };
    },
    methods: {
        chooseCangku (obj) {
            // 关闭菜单
            this.isShowMenu = false;
            this.cangku = obj;
        },
        addHan () {
            // 打开模态框
            this.isShowModal = true;
        }
    }
};
</script>

<style lang="less">
    .wrap_zjfhd{
        h1{
            margin-bottom: 20px;
        }
        b{
            font-size:16px;
        }
        .list{
            width: 600px;
            height: 300px;
        }
        .wrap_zjfhd{
            overflow: hidden;
        }
        .ivu-row{
            padding: 8px 0;
        }
        .bbox{
            font-size:16px;
            margin-bottom: 10px;

            i{
                font-style: normal;
                color:#f38;
            }
            .ivu-table-cell{
                font-size: 18px;
            }
        }
    }
</style>
