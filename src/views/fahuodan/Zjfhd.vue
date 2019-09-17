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
                <MyView :arr="arr" @del="delHan($event)" :showDel="true"/>
            </Col>
        </Row>
        <Row>
            <Col :span="3">
            </Col>
            <Col :span="21">
                <Button type="success" @click="tjHan">提交</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
import DianshangInner from './DianshangInner';
import CangkuInner from './CangkuInner';
import ModalInner from './ModalInner';
import MyView from './MyView';
import axiosInstance from '../../http/axiosInstance';

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
        },
        tjHan () {
            // 开始筹备要发往服务的JSON数据
            let needSendData = {};
            // 电商
            needSendData.shop = this.shop;
            // 仓库
            needSendData.storage = this.cangku.name;
            // 筹备东西
            let _arr = [];
            for (let i = 0; i < this.arr.length; i++) {
                // 遍历工厂
                for (let j = 0; j < this.arr[i].factory.length; j++) {
                    _arr.push({
                        'pname': this.arr[i].pname,
                        'pfactory': this.arr[i].factory[j].fname,
                        'pprice': this.arr[i].pprice,
                        'pnumber': this.arr[i].factory[j].fcount,
                        'ptotal': this.arr[i].pprice * this.arr[i].factory[j].fcount
                    });
                }
            }
            needSendData.things = _arr;
            // Ajax发！起飞！
            // 输出要发的
            // console.log(needSendData);
            // 对数据合法性进行检查
            if (!needSendData.shop) {
                this.$Message.error('你没有选择电商');
                return;
            }
            if (!needSendData.storage) {
                this.$Message.error('你没有选择仓库');
                return;
            }
            if (!needSendData.things) {
                this.$Message.error('你没有任何东西要发');
                return;
            }

            axiosInstance.post('http://192.168.2.250:7729/addpurchlist', needSendData).then((data) => {
                if (data.data === 'ok') {
                    this.$Message.success('发货单添加成功！');
                    this.$router.push({
                        name: 'qbfhd'
                    });
                } else {
                    this.$Message.error('提交失败！请联系管理员！');
                }
            });
        }
    }
};
</script>

<style lang="less">
    .wrap_zjfhd{
        min-height: 600px;
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
