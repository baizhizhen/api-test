<style lang="less">
    @import '../../../../../styles/common.less';
</style>
<template>
    <div class="project-expand-row">
        <i-form></i-form>
        <div v-if="!isEdit">
            <i-row>
                <i-col :span="12">
                    <span>项目名称：</span>
                    <span>{{row.name}}</span>
                </i-col>
                <i-col :span="12">
                    <span>根路径：</span>
                    <span>{{row.rootPath}}</span>
                    <i-button type="primary" @click="edit" style="float:right;position: relative;right: 20px;">编辑
                    </i-button>
                </i-col>
            </i-row>
            <i-row class="margin-bottom-20">
                <i-col :span="24">
                    <span>服务器：</span>
                    <template v-for="(server,index) in row.servers">
                        <router-link to="server_list">
                            <tag :color="index > 0 ? 'red' : 'blue'">{{server.name}}</tag>
                        </router-link>
                    </template>
                </i-col>
            </i-row>
            <i-row class="margin-bottom-20">
                <i-col :span="12">
                    <span>创建时间：</span>
                    <span>{{row.createTime}}</span>
                </i-col>
                <i-col :span="12">
                    <span>创建人：</span>
                    <span>{{row.author}}</span>
                </i-col>
            </i-row>
            <i-row class="margin-bottom-20">
                <i-col :span="24">
                    <span>描述：</span>
                    <span>{{row.description}}</span>
                </i-col>
            </i-row>
        </div>
        <div v-else>
            <i-form ref="projectDetailForm" :model="projectDetail" :rules="projectDetailFormRules" :label-width="80">
                <i-row>
                    <i-col :span="10">
                        <i-form-item label="项目名称"
                                     prop="name">
                            <i-input v-model="projectDetail.name"></i-input>
                        </i-form-item>
                    </i-col>
                    <i-col :span="14">
                        <i-button type="success" @click="save" style="float:right;position: relative;right: 20px;">保存
                        </i-button>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col :span="10">
                        <i-form-item label="根路径"
                                     prop="rootPath">
                            <i-input v-model="projectDetail.rootPath"></i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col :span="24">
                        <i-form-item label="服务器".
                                     prop="serverIds">
                            <i-select v-model="projectDetail.serverIds" multiple style="width:260px">
                                <i-option v-for="server in servers" :value="server.id" :key="server.id">
                                    {{ server.name}}
                                </i-option>
                            </i-select>
                        </i-form-item>
                    </i-col>
                </i-row>
                <i-row>
                    <i-col :span="24">
                        <i-form-item label="描述"
                                     prop="description">
                            <i-input v-model="projectDetail.description"
                                     type="textarea"
                                     :autosize="{minRows: 4,maxRows: 5}">
                            </i-input>
                        </i-form-item>
                    </i-col>
                </i-row>
            </i-form>
        </div>
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
        servers: mockData.servers,
        projectDetail: this.convertRowToFormData(),
        projectDetailFormRules: {
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
        this.projectDetail = this.convertRowToFormData()
      }
    },
    methods: {
      edit () {
        this.isEdit = true
      },
      save () {
        this.$refs.projectDetailForm.validate(valid => {
          if (valid) {
            this.isEdit = false
            this.$emit('on-row-change', this.convertFormDataToRow())
          } else {

          }
        })
      },
      convertFormDataToRow () {
        let data = _.cloneDeep(this.projectDetail)
        data.servers = _.filter(this.servers, server => {
          return _.includes(data.serverIds, server.id)
        })
        delete data.serverIds
        return data
      },
      convertRowToFormData () {
        let data = _.cloneDeep(this.row)
        data.serverIds = _.map(this.row.servers, server => {
          return server.id
        })
        return data
      }
    }
  }
</script>