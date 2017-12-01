<style lang="less" scoped>
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <i-row>
            <i-card>
                <h4 slot="title">
                    <i-icon type="android-archive"></i-icon>
                    导出表格数据到 .Csv 文件
                </h4>
                <i-row>
                    <i-col span="18">
                        <i-table :columns="columnsCsv" :data="csvData" size="small" ref="tableCsv"></i-table>
                    </i-col>
                    <i-col span='6' class="padding-left-10">
                        <div class="exportable-table-download-con1">
                        <span style="margin-right: 16px;">
                            <i-button type="primary" size="large" @click="exportData(1)">
                                <i-icon type="ios-download-outline"></i-icon> 导出原始数据
                            </i-button>
                        </span>
                            <i-button type="primary" size="large" @click="exportData(2)">
                                <i-icon type="ios-download-outline"></i-icon>
                                导出排序和过滤后的数据
                            </i-button>
                        </div>
                        <div class="exportable-table-download-con2">
                            <div>
                                <span>选取行范围：&nbsp;</span>
                                <i-input-number :min="1" :max="selectMaxRow" v-model="selectMinRow"></i-input-number>
                                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                <i-input-number :min="selectMinRow" :max="rowNum"
                                                v-model="selectMaxRow"></i-input-number>
                            </div>
                            <div class="margin-top-10">
                                <span>选取列范围：&nbsp;</span>
                                <i-input-number :min="1" :max="selectMaxCol" v-model="selectMinCol"></i-input-number>
                                <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                <i-input-number :min="selectMinCol" :max="colNum"
                                                v-model="selectMaxCol"></i-input-number>
                            </div>
                            <div class="margin-top-10">
                                <span>输入文件名：</span>
                                <i-input v-model="csvFileName" icon="document" placeholder="请输入文件名"
                                         style="width: 190px"></i-input>
                            </div>
                            <div class="margin-top-20">
                                <i-button type="primary" size="large" @click="exportData(3)">
                                    <i-icon type="ios-download-outline"></i-icon>
                                    导出自定义数据
                                </i-button>
                            </div>
                        </div>
                    </i-col>
                </i-row>
            </i-card>
        </i-row>
        <i-row class="margin-top-10">
            <i-card>
                <h4 slot="title">
                    <i-icon type="android-archive"></i-icon>
                    导出表格数据到 .Xls 文件 (Excel)
                </h4>
                <i-row>
                    <i-col span="18">
                        <i-table :columns="excelColumns" height="390px" :data="table2excelData" size="small"
                                 ref="tableExcel"></i-table>
                    </i-col>
                    <i-col span='6' class="padding-left-10">
                        <div class="margin-top-10 margin-left-10">
                            <span>输入文件名：</span>
                            <i-input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px"/>
                        </div>
                        <div class="margin-left-10 margin-top-20">
                            <a id="hrefToExportTable"
                               style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
                            <i-button type="primary" size="large" @click="exportExcel">下载表格数据</i-button>
                        </div>
                    </i-col>
                </i-row>
            </i-card>
        </i-row>
    </div>
</template>

<script>
  import { table2csvData, csvColumns } from './data/table2csv.js'
  import { table2excelData, excelColumns } from './data/table2excel.js'
  import table2excel from '@/libs/table2excel.js'

  export default {
    name: 'exportable-table',
    data () {
      return {
        columnsCsv: csvColumns,
        csvData: table2csvData,
        table2excelData: table2excelData,
        excelColumns: excelColumns,
        rowNum: table2csvData.length,
        colNum: csvColumns.length,
        selectMinRow: 1,
        selectMaxRow: table2csvData.length,
        selectMinCol: 1,
        selectMaxCol: csvColumns.length,
        maxRow: 0,
        minRow: 1,
        maxCol: 0,
        minCol: 1,
        csvFileName: '',
        excelFileName: '',
        tableExcel: {},
        fontSize: 16
      }
    },
    methods: {
      exportData (type) {
        if (type === 1) {
          this.$refs.tableCsv.exportCsv({
            filename: '原始数据'
          })
        } else if (type === 2) {
          this.$refs.tableCsv.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          })
        } else if (type === 3) {
          this.$refs.tableCsv.exportCsv({
            filename: this.csvFileName,
            columns: this.columnsCsv.filter((col, index) => index >= this.selectMinCol - 1 && index <= this.selectMaxCol - 1),
            data: this.csvData.filter((data, index) => index >= this.selectMinRow - 1 && index <= this.selectMaxRow - 1)
          })
        }
      },
      exportExcel () {
        table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName)
      }
    }
  }
</script>
