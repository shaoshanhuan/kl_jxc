<template>
    <div>
        <RadioGroup v-model="st" type="button">
            <Radio label="cpst">产品视图</Radio>
            <Radio label="gcst">工厂视图</Radio>
        </RadioGroup>
        <div class="h20"></div>
        <div v-show="st === 'cpst'">
            <div v-for="(item, index) in arr" :key="index" class="bbox">
                <h3><i>{{item.pname}}</i>产品应该由下列工厂发货</h3>
                <Table :columns="getCol1(item.pname)" :data="item.factory"></Table>
            </div>
        </div>

        <div v-show="st === 'gcst'">
            <div v-for="(v, k) in gcstObj" :key="k" class="bbox">
                <h3><i>{{k}}</i>工厂应该发以下货</h3>
                <Table :columns="getCol2(k)" :data="v"></Table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['arr'],
    data () {
        return {
            'st': 'cpst',
            'key': 1
        };
    },
    methods: {
        getCol1 (pname) {
            return [
                { 'title': '工厂名', 'key': 'fname' },
                { 'title': '发货数量', 'key': 'fcount' },
                { 'title': '删除',
                    render: (h, { row }) => {
                        return h('Poptip', {
                            attrs: {
                                confirm: true,
                                title: '真的要删除么？',
                                placement: 'right'
                            },
                            on: {
                                'on-ok': () => {
                                    this.$emit('del', { 'fname': row.fname, 'pname': pname });
                                }
                            }
                        }, [
                            h('Button', {
                                attrs: {
                                    type: 'warning'
                                }
                            }, '删除')
                        ]);
                    }
                }
            ];
        },
        getCol2 (fname) {
            return [
                { 'title': '货物', 'key': 'pname' },
                { 'title': '发货数量', 'key': 'fcount' },
                { 'title': '删除',
                    render: (h, { row }) => {
                        return h('Poptip', {
                            attrs: {
                                confirm: true,
                                title: '真的要删除么？',
                                placement: 'right'
                            },
                            on: {
                                'on-ok': () => {
                                    this.$emit('del', { 'pname': row.pname, 'fname': fname });
                                }
                            }
                        }, [
                            h('Button', {
                                attrs: {
                                    type: 'warning'
                                }
                            }, '删除')
                        ]);
                    }
                }
            ];
        }
    },
    computed: {
        gcstObj () {
            // 根据传入arr创建对象
            let obj = {};

            for (let i = 0; i < this.arr.length; i++) {
                let { ptype, pname, factory } = this.arr[i];
                for (let j = 0; j < factory.length; j++) {
                    let { fname, fcount } = factory[j];
                    if (obj.hasOwnProperty(fname)) {
                        obj[fname].push({ ptype, pname, fcount });
                    } else {
                        obj[fname] = [
                            { ptype, pname, fcount }
                        ];
                    }
                }
            }

            return obj;
        }
    }
};
</script>

<style lang="less" scoped>
    .h20{
        height:20px;
    }
    i{
        font-style:normal;
        color:#f38;
    }
</style>
