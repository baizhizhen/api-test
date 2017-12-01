<style lang="less">
    @import '../../../../../styles/common.less';
</style>
<template>
    <div class="server-expand-row">
        <i-form ref="rowForm"
                :model="server"
                :rules="rowFormRules"
                :label-width="100"
                label-position="right">
            <i-row>
                <i-col :span="10">
                    <i-form-item label="名称："
                                 prop="name">
                        <i-input v-if="isEdit" v-model="server.name"></i-input>
                        <span v-else>{{server.name}}</span>
                    </i-form-item>
                </i-col>
                <i-col :span="14">
                    <i-button v-if="!isEdit"
                              type="primary"
                              style="float:right;position: relative;right: 20px"
                              @click="edit">编辑
                    </i-button>
                </i-col>
            </i-row>
            <i-row>
                <i-col :span="6">
                    <i-form-item label="IP："
                                 prop="ip">
                        <i-input v-if="isEdit"
                                 v-model="server.ip">
                        </i-input>
                        <span v-else>{{server.ip}}</span>
                    </i-form-item>
                </i-col>
                <i-col :span="4">
                    <i-form-item label="Port："
                                 prop="port">
                        <i-input v-if="isEdit"
                                 v-model="server.port">
                        </i-input>
                        <span v-else>{{server.port}}</span>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col :span="10">
                    <i-form-item label="项目："
                                 prop="serverId">
                        <i-select v-if="isEdit" v-model="server.projectId">
                            <i-option v-for="project in projects" :value="project.id" :key="project.id">
                                {{project.name}}
                            </i-option>
                        </i-select>
                        <span v-else>{{server.projectName}}</span>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row v-if="!isEdit">
                <i-col :span="12">
                    <i-form-item label="创建时间："
                                 prop="createTime">
                        <span>{{server.createTime}}</span>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row v-if="!isEdit">
                <i-col :span="12">
                    <i-form-item label="创建人："
                                 prop="author">
                        <span>{{server.author}}</span>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row>
                <i-col :span="14">
                    <i-form-item label="描述："
                                 prop="description">
                        <i-input v-if="isEdit"
                                 v-model="server.description"
                                 type="textarea"
                                 :autosize="{minRows: 4,maxRows: 5}">
                        </i-input>
                        <span v-else>{{server.description}}</span>
                    </i-form-item>
                </i-col>
            </i-row>
            <i-row v-if="isEdit">
                <i-col :span="24" style="padding-left: 100px;">
                    <i-button type="success"
                              @click="save">保存
                    </i-button>
                    <i-button type="text"
                              @click="cancel">取消
                    </i-button>
                </i-col>
            </i-row>
        </i-form>
    </div>
</template>
<script>
  import mockData from '../data'

  export default {
    props: {
      row: Object
    },
    data () {
      return {
        isEdit: false,
        projects: mockData.projectRows,
        server: _.cloneDeep(this.row),
        rowFormRules: {
          name: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          description: [
            {type: 'string', max: 300, message: '描述不能超过30个字符', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      row () {
        this.server = _.cloneDeep(this.row)
      }
    },
    methods: {
      edit () {
        this.isEdit = true
      },
      save () {
        this.$refs.rowForm.validate(valid => {
          if (valid) {
            this.isEdit = false
          } else {

          }
        })
      },
      cancel () {
        this.isEdit = false
      }
    }
  }
</script>