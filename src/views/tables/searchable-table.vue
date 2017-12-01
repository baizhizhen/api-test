<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <i-row :gutter="10">
            <i-col span="8">
                <i-card>
                    <p slot="title">
                        <i-icon type="pinpoint"></i-icon>
                        一个条件搜索
                    </p>
                    <i-row>
                        <i-input v-model="searchConName1"
                                 icon="search"
                                 placeholder="请输入姓名搜索..."
                                 style="width: 200px"
                                 @on-change="handleSearch1">
                        </i-input>
                    </i-row>
                    <i-row class="margin-top-10 searchable-table-con1">
                        <i-table :columns="columns1" :data="data1"></i-table>
                    </i-row>
                </i-card>
            </i-col>
            <i-col span="8">
                <i-card>
                    <p slot="title">
                        <i-icon type="help-buoy"></i-icon>
                        多个条件搜索
                    </p>
                    <i-row>
                        <i-input v-model="searchConName2"
                                 icon="search"
                                 placeholder="请输入姓名搜搜..."
                                 style="width: 200px"
                                 @on-change="handleSearch2">
                        </i-input>
                        <i-input v-model="searchConTel2"
                                 icon="search"
                                 placeholder="请输入手机号搜搜..."
                                 style="width: 200px"
                                 @on-change="handleSearch2">
                        </i-input>
                    </i-row>
                    <i-row class="margin-top-10 searchable-table-con1">
                        <i-table :columns="columns1" :data="data2"></i-table>
                    </i-row>
                </i-card>
            </i-col>
            <i-col span="8">
                <i-card>
                    <p slot="title">
                        <i-icon type="mouse"></i-icon>
                        点击搜索进行搜索
                    </p>
                    <i-row>
                        <i-input v-model="searchConName3"
                                 placeholder="请输入姓名搜搜..."
                                 style="width: 200px">
                        </i-input>
                        <span @click="handleSearch3" style="margin: 0 10px;">
                            <i-button type="primary"
                                      icon="search">搜索
                            </i-button>
                        </span>
                        <i-button @click="handleCancel3" type="ghost">取消</i-button>
                    </i-row>
                    <i-row class="margin-top-10 searchable-table-con1">
                        <i-table :columns="columns1" :data="data3"></i-table>
                    </i-row>
                </i-card>
            </i-col>
        </i-row>
    </div>
</template>

<script>
  import * as table from './data/search'

  export default {
    name: 'searchable-table',
    data () {
      return {
        searchConName1: '',
        searchConName2: '',
        searchConTel2: '',
        searchConName3: '',
        columns1: table.columns1,
        data1: [],
        initTable1: [],
        data2: [],
        initTable2: [],
        data3: [],
        initTable3: []
      }
    },
    methods: {
      init () {
        this.data1 = this.initTable1 = table.searchTable1
        this.data2 = this.initTable2 = table.searchTable2
        this.data3 = this.initTable3 = table.searchTable3
      },
      search (data, argumentObj) {
        let res = data
        let dataClone = data
        for (let argu in argumentObj) {
          if (argumentObj[argu].length > 0) {
            res = dataClone.filter(d => {
              return d[argu].indexOf(argumentObj[argu]) > -1
            })
            dataClone = res
          }
        }
        return res
      },
      handleSearch1 () {
        this.data1 = this.initTable1
        this.data1 = this.search(this.data1, {name: this.searchConName1})
      },
      handleSearch2 () {
        this.data2 = this.initTable2
        this.data2 = this.search(this.data2, {name: this.searchConName2, tel: this.searchConTel2})
      },
      handleSearch3 () {
        this.data3 = this.initTable3
        this.data3 = this.search(this.data3, {name: this.searchConName3})
      },
      handleCancel3 () {
        this.data3 = this.initTable3
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
