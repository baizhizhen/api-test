<style lang="less">
    @import '../../../../styles/common.less';
    @import './server.less';
</style>

<template>
    <div class="server">
        <i-row></i-row>
        <i-row class="margin-top-10">
            <i-card>
                <p slot="title">
                    <i-icon type="android-desktop"></i-icon>
                    服务管理
                </p>
                <i-row>
                    <i-button type="primary"
                              icon="plus-round"
                              @click="handleCreate">新增
                    </i-button>
                    <i-button type="text"
                              icon="load-b">Ping++
                    </i-button>
                    <i-input v-model="searchKey"
                             class="right"
                             icon="search"
                             placeholder="请输入项目名称"
                             style="width: 200px">
                    </i-input>
                    <i-select v-model="projectIdsKey" multiple class="right margin-right-10" style="width: 200px">
                        <i-option v-for="project in projects" :value="project.id" :key="project.id">
                            {{project.name}}
                        </i-option>
                    </i-select>
                </i-row>
                <i-row class="margin-top-10">
                    <can-edit-table
                            refs="server-table"
                            v-model="filteredRows"
                            :hoverShow="true"
                            @on-cell-change="handleCellChange"
                            @on-change="handleChange"
                            @on-delete="handleDelete"
                            @on-row-change="handleRowChange"
                            :editIncell="true"
                            :columns-list="serverCols">
                    </can-edit-table>
                </i-row>
            </i-card>
        </i-row>
        <i-modal title="添加服务"
                 v-model="isShowEditModal"
                 :mask-closable="false"
                 ok-text="保存"
                 transfer
                 @on-ok="handleSave">
            <i-form ref="form" :model="newServer" :rules="formRules" :label-width="80">
                <i-form-item label="名称"
                             prop="name">
                    <i-input v-model="newServer.name"></i-input>
                </i-form-item>
                <i-form-item label="IP"
                             prop="rootPath">
                    <i-input v-model="newServer.ip"></i-input>
                </i-form-item>
                <i-form-item label="Port"
                             prop="prot">
                    <i-input v-model="newServer.port"></i-input>
                </i-form-item>
                <i-form-item label="描述"
                             prop="description">
                    <i-input v-model="newServer.description"
                             type="textarea"
                             :autosize="{minRows: 4,maxRows: 5}">
                    </i-input>
                </i-form-item>
            </i-form>
        </i-modal>
    </div>
</template>
<script>
  import canEditTable from '../../../main-components/common/tables/canEditTable.vue'
  import mockData from './data'
  import util from '@/libs/util.js'

  export default {
    components: {
      canEditTable
    },
    data () {
      return {
        serverRows: mockData.severRows,
        projects: mockData.projectRows,
        serverCols: mockData.serverCols,
        searchKey: '',
        projectIdsKey: [],
        newServer: {
          name: '',
          ip: '',
          port: 8080,
          projectId: 1000,
          projectName: '数尊塔',
          createTime: '2017-12-12 11:20:11',
          author: 'Jason'
        },
        formRules: {
          name: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          description: [
            {type: 'string', max: 300, message: '描述不能超过30个字符', trigger: 'blur'}
          ]
        },
        isShowEditModal: false
      }
    },
    computed: {
      filteredRows () {
        let data = this.serverRows
        let searchKey = _.trim(this.searchKey)
        if (searchKey) {
          data = _.filter(data, row => {
            return row.name.indexOf(searchKey) > -1
          })
        }

        if (this.projectIdsKey.length > 0) {
          data = _.filter(data, row => {
            return _.includes(this.projectIdsKey, row.projectId)
          })
        }

        return data
      }
    },
    methods: {
      handleCellChange (val, index, key) {
        this.$Message.success('保存成功')
      },
      handleChange (val, index) {
        this.$Message.success('保存成功')
      },
      handleDelete (val, index) {
        this.$Message.success('删除成功')
      },
      handleCreate () {
        this.$refs.form.resetFields()
        this.isShowEditModal = true
      },
      handleRowChange (row) {
        console.log('------row----')
        console.log(row)

      },
      handleSave () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.serverRows.push(this.newServer)
            this.$Message.success('保存成功')
          } else {
          }
        })
      }
    }
  }
</script>