<style lang="less">
    @import '../../../../styles/common.less';
    @import './project.less';
</style>

<template>
    <div class="project">
        <i-tabs size="small" v-model="activeTab">
            <i-button type="text" icon="plus" slot="extra" @click="add"></i-button>
            <template v-for="(project,index) in projectFormsData">
                <i-tab-pane :label="project.name">
                    <i-form :ref="'projectForm'+index"
                            :model="project"
                            :rules="projectFormRules"
                            :label-width="100"
                            label-position="right">
                        <i-row>
                            <i-col :span="10">
                                <i-form-item label="名称："
                                             prop="name">
                                    <i-input v-if="project.isEdit" v-model="project.name"></i-input>
                                    <span v-else>{{project.name}}</span>
                                </i-form-item>
                            </i-col>
                            <i-col :span="14">
                                <i-button v-if="!project.isEdit"
                                          type="primary"
                                          style="float:right"
                                          @click="edit(project)">编辑
                                </i-button>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col :span="10">
                                <i-form-item label="根路径："
                                             prop="rootPath">
                                    <i-input v-if="project.isEdit"
                                             v-model="project.rootPath">
                                    </i-input>
                                    <span v-else>{{project.rootPath}}</span>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col :span="24">
                                <i-form-item label="服务器："
                                             prop="serverIds">
                                    <i-select v-if="project.isEdit"
                                              v-model="project.serverIds"
                                              multiple
                                              style="width:260px">
                                        <i-option v-for="server in servers"
                                                  :value="server.id"
                                                  :key="server.id">{{ server.name}}
                                        </i-option>
                                    </i-select>
                                    <router-link v-else
                                                 v-for="(server,serverIndex) in project.servers"
                                                 to="server_list">
                                        <tag :color="serverIndex > 0 ? 'red' : 'blue'">{{server.name}}</tag>
                                    </router-link>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row v-if="!project.isEdit">
                            <i-col :span="12">
                                <i-form-item label="创建时间："
                                             prop="createTime">
                                    <span>{{project.createTime}}</span>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row v-if="!project.isEdit">
                            <i-col :span="12">
                                <i-form-item label="创建人："
                                             prop="author">
                                    <span>{{project.author}}</span>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row>
                            <i-col :span="14">
                                <i-form-item label="描述："
                                             prop="description">
                                    <i-input v-if="project.isEdit"
                                             v-model="project.description"
                                             type="textarea"
                                             :autosize="{minRows: 4,maxRows: 5}">
                                    </i-input>
                                    <span v-else>{{project.description}}</span>
                                </i-form-item>
                            </i-col>
                        </i-row>
                        <i-row v-if="project.isEdit">
                            <i-col :span="24" style="padding-left: 100px;">
                                <i-button type="success"
                                          @click="save(project,index)">保存
                                </i-button>
                                <i-button type="text"
                                          @click="cancel(project,index)">取消
                                </i-button>
                            </i-col>
                        </i-row>
                    </i-form>
                </i-tab-pane>
            </template>
        </i-tabs>
    </div>
</template>
<script>
  import mockData from './data'
  import util from '@/libs/util.js'

  export default {
    components: {},
    data () {
      return {
        activeTab: 0,
        servers: mockData.servers,
        projects: mockData.projectRows,
        projectFormsData: [],
        projectFormRules: {
          name: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'}
          ],
          description: [
            {type: 'string', max: 300, message: '描述不能超过30个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      this.projectFormsData = _.cloneDeep(this.projects)
    },
    computed: {},
    methods: {
      edit (project) {
        this.$set(project, 'serverIds', _.map(project.servers, 'id'))
        this.$set(project, 'isEdit', true)
      },
      add () {
        let newProject = {
          name: '未命名',
          description: '',
          isEdit: true,
          serverIds: [],
          createTime: '2017-11-12 12:20:00',
          author: '白志珍',
          rootPath: '',
          servers: [],
          apis: []
        }
        this.projectFormsData.push(newProject)
        this.activeTab = this.projectFormsData.length - 1
      },
      save (project, index) {
        this.$refs['projectForm' + index][0].validate(valid => {
          if (valid) {
            project.servers = _.filter(this.servers, server => {
              return _.includes(project.serverIds, server.id)
            })
            delete project.serverIds
            this.$set(project, 'isEdit', false)
            this.projects.splice(index, 1, _.cloneDeep(project))
            this.$Message.success('保存成功')
          } else {

          }
        })
      },
      cancel (project, index) {
        if (project.id) {
          let beforeEditProject = _.cloneDeep(_.find(this.projects, {id: project.id}))
          this.projectFormsData.splice(index, 1, beforeEditProject)
        } else {
          this.projectFormsData.splice(index, 1)
          this.activeTab = 0
        }
      }
    }
  }
</script>