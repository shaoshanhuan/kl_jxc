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
                <MyView :arr="arr" @del="delHan($event)"/>
            </Col>
        </Row>
        <Row>
            <Col :span="3">
            </Col>
            <Col :span="21">
                <Button type="success">提交</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import DianshangInner from './DianshangInner';
import CangkuInner from './CangkuInner';
import ModalInner from './ModalInner';
import MyView from './MyView';

export default {
    components: {
        DianshangInner,
        CangkuInner,
        ModalInner,
        MyView
    },
    data () {
        return {
            'shop': '',
            'cangku': {},
            'isShowMenu': false,
            'arr': []
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
        },
        delHan (obj) {
            // 删除
            // 遍历
            for (let i = 0; i < this.arr.length; i++) {
                if (this.arr[i].pname === obj.pname) {
                    this.arr[i].factory = this.arr[i].factory.filter(item => item.fname !== obj.fname);
                    // 如果工厂被删光了，就删除整个项
                    if (this.arr[i].factory.length === 0) {
                        this.arr.splice(i, 1);
                    }
                }
            }
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
