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
                        {{!cangku.name ? '点击选择' : shop + ' / ' + cangku.name}}
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
                <b>增加货物</b>
            </Col>
            <Col :span="21">
                <Button @click="addHan">点击增加</Button>
            </Col>
        </Row>

        <Modal v-model="isShowModal" title="增加货物" width="800">
            <ModalInner v-if="isShowModal" />
        </Modal>
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
            'isShowModal': false
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

<style lang="less" scoped>
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
        height:400px;
    }
    .ivu-row{
        padding: 8px 0;
    }
</style>
