<style lang="less">
    @import '../../../../styles/common.less';
    @import './api.less';
</style>
<template>
    <div class="api">
        <i-card>
            <p slot="title">
                <i-icon type="pinpoint"></i-icon>
                Api配置
            </p>
            <i-row>
                <i-button type="primary"
                          icon="plus-round"
                          @click="handleCreate">新增
                </i-button>
                <i-button type="error"
                          icon="trash-a"
                          @click="handleDelete">删除
                </i-button>
                <i-input v-model="searchKey"
                         class="right"
                         icon="search"
                         placeholder="请输入关键字"
                         style="width: 200px">
                </i-input>
                <i-select v-model="projectIdsKey" multiple class="right margin-right-10" style="width: 200px">
                    <i-option v-for="project in projects" :value="project.id" :key="project.id">
                        {{project.name}}
                    </i-option>
                </i-select>
            </i-row>
            <i-row class="margin-top-10">
                <i-table :columns="apiCols" :data="apiRows" border></i-table>
                <i-page :total="100" show-sizer class="margin-top-10 right" ></i-page>
            </i-row>
        </i-card>
    </div>
</template>
<script>
  import mockData from './data'

  export default {
    data () {
      return {
        searchKey: '',
        projectIdsKey: [],
        apiRows: mockData.apiRows,
        apiCols: mockData.apiCols,
        projects: mockData.projectRows
      }
    },
    methods: {
      handleCreate () {

      }
    }
  }
</script>