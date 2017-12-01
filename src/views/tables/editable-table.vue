<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <i-row>
            <i-col span="6">
                <i-card>
                    <p slot="title">
                        <i-icon type="load-b"></i-icon>
                        简单说明
                    </p>
                    <div class="edittable-test-con">
                        可编辑单元格可配置可编辑的列，可设置编辑整行的可编辑单元格，也可配置单个编辑可编辑单元格，也可两种形式同时可用。可配置单元格内编辑的图标显示方式。
                    </div>
                </i-card>
            </i-col>
            <i-col span="18" class="padding-left-10">
                <i-card>
                    <div class="edittable-con-1">
                        <can-edit-table refs="table1"
                                        v-model="tableData"
                                        :columns-list="columnsList"
                                        @on-delete="handleDel">
                        </can-edit-table>
                    </div>
                </i-card>
            </i-col>
        </i-row>
        <i-row class="margin-top-10">
            <i-col span="12">
                <i-card>
                    <p slot="title">
                        <i-icon type="android-remove"></i-icon>
                        可编辑单元行
                    </p>
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="table2"
                                        v-model="editInlineData"
                                        :columns-list="editInlineColumns">
                        </can-edit-table>
                    </div>
                </i-card>
            </i-col>
            <i-col span="12" class="padding-left-10">
                <i-card>
                    <p slot="title">
                        <i-icon type="android-more-horizontal"></i-icon>
                        可编辑单元格(鼠标移入显示编辑单元格按钮)
                    </p>
                    <div class="edittable-table-height-con">
                        <can-edit-table refs="table3"
                                        v-model="editIncellData"
                                        :hover-show="true"
                                        :edit-incell="true"
                                        :columns-list="editIncellColumns">
                        </can-edit-table>
                    </div>
                </i-card>
            </i-col>
        </i-row>
        <i-row class="margin-top-10">
            <i-col span="24">
                <i-card>
                    <p slot="title">
                        <i-icon type="ios-keypad"></i-icon>
                        单元行和单元格两种方式编辑(始终显示编辑单元格按钮)
                    </p>
                    <i-row :gutter="10">
                        <i-col span="2">
                            <i-row type="flex" justify="center" align="middle"
                                   class="edittable-table-get-currentdata-con">
                                <i-button type="primary" @click="getCurrentData">当前数据</i-button>
                            </i-row>
                        </i-col>
                        <i-col span="22">
                            <div class="edittable-table-height-con">
                                <can-edit-table
                                        refs="table4"
                                        v-model="editInlineAndCellData"
                                        @on-cell-change="handleCellChange"
                                        @on-change="handleChange"
                                        :editIncell="true"
                                        :columns-list="editInlineAndCellColumn"
                                ></can-edit-table>
                            </div>
                        </i-col>
                        <i-modal :width="900" v-model="showCurrentTableData">
                            <can-edit-table refs="table5" v-model="editInlineAndCellData"
                                            :columns-list="showCurrentColumns"></can-edit-table>
                        </i-modal>
                    </i-row>
                </i-card>
            </i-col>
        </i-row>
    </div>
</template>

<script>
  import canEditTable from './components/canEditTable.vue'
  import tableData from './components/table_data.js'

  export default {
    name: 'editable-table',
    components: {
      canEditTable
    },
    data () {
      return {
        columnsList: [],
        tableData: [],
        editInlineColumns: [],
        editInlineData: [],
        editIncellColumns: [],
        editIncellData: [],
        editInlineAndCellColumn: [],
        editInlineAndCellData: [],
        showCurrentColumns: [],
        showCurrentTableData: false
      }
    },
    methods: {
      getData () {
        this.columnsList = tableData.table1Columns
        this.tableData = tableData.table1Data
        this.editInlineColumns = tableData.editInlineColumns
        this.editInlineData = tableData.editInlineData
        this.editIncellColumns = tableData.editIncellColumns
        this.editIncellData = tableData.editIncellData
        this.editInlineAndCellColumn = tableData.editInlineAndCellColumn
        this.editInlineAndCellData = tableData.editInlineAndCellData
        this.showCurrentColumns = tableData.showCurrentColumns
      },
      handleNetConnect (state) {
        this.breakConnect = state
      },
      handleLowSpeed (state) {
        this.lowNetSpeed = state
      },
      getCurrentData () {
        this.showCurrentTableData = true
      },
      handleDel (val, index) {
        this.$Message.success('删除了第' + (index + 1) + '行数据')
      },
      handleCellChange (val, index, key) {
        this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据')
      },
      handleChange (val, index) {
        this.$Message.success('修改了第' + (index + 1) + '行数据')
      }
    },
    created () {
      this.getData()
    }
  }
</script>
