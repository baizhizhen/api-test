<style lang="less">
    @import '../../../styles/common.less';
    @import './article-publish.less';
</style>

<template>
    <div>
        <i-row>
            <i-col span="18">
                <i-card>
                    <i-form :label-width="80">
                        <i-form-item label="文章标题" :error="articleError">
                            <i-input v-model="articleTitle"
                                     @on-blur="handleArticletitleBlur"
                                     icon="android-list">
                            </i-input>
                        </i-form-item>
                        <div class="article-link-con">
                            <transition name="fixed-link">
                                <i-form-item v-show="showLink" label="固定链接">
                                    <span>
                                        <span key="pathfixedtext">{{ fixedLink }}</span>
                                        <span key="pathText"
                                              v-if="!editLink">{{ articlePath}}
                                        </span>
                                        <i-input v-else
                                                 key="pathInput"
                                                 v-model="articlePath"
                                                 style="display:inline-block;width:auto">
                                        </i-input>
                                    </span>
                                    <span style="float:right;">
                                        <i-button :type="editPathButtonType"
                                                  @click="editArticlePath">{{ editPathButtonText }}
                                        </i-button>
                                    </span>
                                </i-form-item>
                            </transition>
                        </div>
                    </i-form>
                    <div class="margin-top-20">
                        <textarea id="articleEditor"></textarea>
                    </div>
                </i-card>
            </i-col>
            <i-col span="6" class="padding-left-10">
                <i-card>
                    <p slot="title">
                        <i-icon type="paper-airplane"></i-icon>
                        发布
                    </p>
                    <p class="margin-top-10">
                        <i-icon type="android-time"></i-icon>&nbsp;&nbsp;状&nbsp;&nbsp;&nbsp; 态：
                        <i-select size="small" style="width:90px" value="草稿">
                            <i-option v-for="item in articleStateList"
                                      :value="item.value"
                                      :key="item.value">{{ item.value}}
                            </i-option>
                        </i-select>
                    </p>
                    <p class="margin-top-10">
                        <i-icon type="eye"></i-icon>&nbsp;&nbsp;公开度：&nbsp;<b>{{ Openness }}</b>
                        <i-button v-show="!editOpenness" size="small" @click="handleEditOpenness" type="text">修改
                        </i-button>
                        <transition name="openness-con">
                            <div v-show="editOpenness" class="openness-radio-con">
                                <i-radio-group v-model="currentOpenness" vertical>
                                    <i-radio label="公开">
                                        公开
                                        <i-checkbox v-show="currentOpenness === '公开'" v-model="topArticle">在首页置顶这篇文章
                                        </i-checkbox>
                                    </i-radio>
                                    <i-radio label="密码">
                                        密码
                                        <i-input v-show="currentOpenness === '密码'" style="width:120px" size="small"
                                                 placeholder="请输入密码"></i-input>
                                    </i-radio>
                                    <i-radio label="私密"></i-radio>
                                </i-radio-group>
                                <div>
                                    <i-button type="primary" @click="handleSaveOpenness">确认</i-button>
                                    <i-button type="ghost" @click="cancelEditOpenness">取消</i-button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <p class="margin-top-10">
                        <i-icon type="ios-calendar-outline"></i-icon>&nbsp;&nbsp;
                        <span v-if="publishTimeType === 'immediately'">立即发布</span>
                        <span v-else>定时：{{ publishTime}}</span>
                        <i-button v-show="!editPublishTime" size="small" @click="handleEditPublishTime" type="text">修改
                        </i-button>
                        <transition name="publish-time">
                            <div v-show="editPublishTime" class="publish-time-picker-con">
                                <div class="margin-top-10">
                                    <i-date-picker @on-change="setPublishTime"
                                                   type="datetime"
                                                   style="width:200px;"
                                                   placeholder="选择日期和时间">
                                    </i-date-picker>
                                </div>
                                <div class="margin-top-10">
                                    <i-button type="primary" @click="handleSavePublishTime">确认</i-button>
                                    <i-button type="ghost" @click="cancelEditPublishTime">取消</i-button>
                                </div>
                            </div>
                        </transition>
                    </p>
                    <i-row class="margin-top-20 publish-button-con">
                        <span class="publish-button">
                            <i-button @click="handlePreview">预览</i-button>
                        </span>
                        <span class="publish-button">
                            <i-button @click="handleSaveDraft">保存草稿</i-button>
                        </span>
                        <span class="publish-button">
                            <i-button @click="handlePublish"
                                      :loading="publishLoading"
                                      icon="ios-checkmark" style="width:90px;"
                                      type="primary">发布
                            </i-button>
                        </span>
                    </i-row>
                </i-card>
                <div class="margin-top-10">
                    <i-card>
                        <p slot="title">
                            <i-icon type="navicon-round"></i-icon>
                            分类目录
                        </p>
                        <i-tabs type="card">
                            <i-tab-pane label="所有分类目录">
                                <div class="classification-con">
                                    <i-tree :data="classificationList"
                                            @on-check-change="setClassificationInAll"
                                            show-checkbox>
                                    </i-tree>
                                </div>
                            </i-tab-pane>
                            <i-tab-pane label="常用目录">
                                <div class="classification-con">
                                    <i-checkbox-group v-model="offenUsedClassSelected"
                                                      @on-change="setClassificationInOffen">
                                        <p v-for="item in offenUsedClass"
                                           :key="item.title">
                                            <i-checkbox :label="item.title">{{ item.title }}</i-checkbox>
                                        </p>
                                    </i-checkbox-group>
                                </div>
                            </i-tab-pane>
                        </i-tabs>
                    </i-card>
                </div>
                <div class="margin-top-10">
                    <i-card>
                        <p slot="title">
                            <i-icon type="ios-pricetags-outline"></i-icon>
                            标签
                        </p>
                        <i-row>
                            <i-col span="18">
                                <Select v-model="articleTagSelected" multiple @on-change="handleSelectTag"
                                        placeholder="请选择文章标签">
                                    <Option v-for="item in articleTagList" :value="item.value" :key="item.value">
                                        {{ item.value }}
                                    </Option>
                                </Select>
                            </i-col>
                            <i-col span="6" class="padding-left-10">
                                <Button v-show="!addingNewTag" @click="handleAddNewTag" long type="ghost">新建</Button>
                            </i-col>
                        </i-row>
                        <transition name="add-new-tag">
                            <div v-show="addingNewTag" class="add-new-tag-con">
                                <i-col span="14">
                                    <Input v-model="newTagName" placeholder="请输入标签名"/>
                                </i-col>
                                <i-col span="5" class="padding-left-10">
                                    <Button @click="createNewTag" long type="primary">确定</Button>
                                </i-col>
                                <i-col span="5" class="padding-left-10">
                                    <Button @click="cancelCreateNewTag" long type="ghost">取消</Button>
                                </i-col>
                            </div>
                        </transition>
                    </i-card>
                </div>
            </i-col>
        </i-row>
    </div>
</template>

<script>
  import tinymce from 'tinymce'

  export default {
    name: 'artical-publish',
    data () {
      return {
        articleTitle: '',
        articleError: '',
        showLink: false,
        fixedLink: '',
        articlePath: '',
        articlePathHasEdited: false,
        editLink: false,
        editPathButtonType: 'ghost',
        editPathButtonText: '编辑',
        articleStateList: [{value: '草稿'}, {value: '等待复审'}],
        editOpenness: false,
        Openness: '公开',
        currentOpenness: '公开',
        topArticle: false,
        publishTime: '',
        publishTimeType: 'immediately',
        editPublishTime: false,  // 是否正在编辑发布时间
        articleTagSelected: [],  // 文章选中的标签
        articleTagList: [],  // 所有标签列表
        classificationList: [],
        classificationSelected: [],  // 在所有分类目录中选中的目录数组
        offenUsedClass: [],
        offenUsedClassSelected: [],  // 常用目录选中的目录
        classificationFinalSelected: [],  // 最后实际选择的目录
        publishLoading: false,
        addingNewTag: false,  // 添加新标签
        newTagName: '' // 新建标签名
      }
    },
    methods: {
      handleArticletitleBlur () {
        if (this.articleTitle.length !== 0) {
          // this.articleError = '';
          localStorage.articleTitle = this.articleTitle // 本地存储文章标题
          if (!this.articlePathHasEdited) {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/'
            this.articlePath = this.articleTitle
            this.articlePathHasEdited = true
            this.showLink = true
          }
        } else {
          // this.articleError = '文章标题不可为空哦';
          this.$Message.error('文章标题不可为空哦')
        }
      },
      editArticlePath () {
        this.editLink = !this.editLink
        this.editPathButtonType = this.editPathButtonType === 'ghost' ? 'success' : 'ghost'
        this.editPathButtonText = this.editPathButtonText === '编辑' ? '完成' : '编辑'
      },
      handleEditOpenness () {
        this.editOpenness = !this.editOpenness
      },
      handleSaveOpenness () {
        this.Openness = this.currentOpenness
        this.editOpenness = false
      },
      cancelEditOpenness () {
        this.currentOpenness = this.Openness
        this.editOpenness = false
      },
      handleEditPublishTime () {
        this.editPublishTime = !this.editPublishTime
      },
      handleSavePublishTime () {
        this.publishTimeType = 'timing'
        this.editPublishTime = false
      },
      cancelEditPublishTime () {
        this.publishTimeType = 'immediately'
        this.editPublishTime = false
      },
      setPublishTime (datetime) {
        this.publishTime = datetime
      },
      setClassificationInAll (selectedArray) {
        this.classificationFinalSelected = selectedArray.map(item => {
          return item.title
        })
        localStorage.classificationSelected = JSON.stringify(this.classificationFinalSelected)  // 本地存储所选目录列表
      },
      setClassificationInOffen (selectedArray) {
        this.classificationFinalSelected = selectedArray
      },
      handleAddNewTag () {
        this.addingNewTag = !this.addingNewTag
      },
      createNewTag () {
        if (this.newTagName.length !== 0) {
          this.articleTagList.push({value: this.newTagName})
          this.addingNewTag = false
          setTimeout(() => {
            this.newTagName = ''
          }, 200)
        } else {
          this.$Message.error('请输入标签名')
        }
      },
      cancelCreateNewTag () {
        this.newTagName = ''
        this.addingNewTag = false
      },
      canPublish () {
        if (this.articleTitle.length === 0) {
          this.$Message.error('请输入文章标题')
          return false
        } else {
          return true
        }
      },
      handlePreview () {
        if (this.canPublish()) {
          if (this.publishTimeType === 'immediately') {
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = date.getHours()
            let minute = date.getMinutes()
            let second = date.getSeconds()
            localStorage.publishTime = year + ' 年 ' + month + ' 月 ' + day + ' 日 -- ' + hour + ' : ' + minute + ' : ' + second
          } else {
            localStorage.publishTime = this.publishTime  // 本地存储发布时间
          }
          localStorage.content = tinymce.activeEditor.getContent()
          this.$router.push({
            name: 'preview'
          })
        }
      },
      handleSaveDraft () {
        if (!this.canPublish()) {
          //
        }
      },
      handlePublish () {
        if (this.canPublish()) {
          this.publishLoading = true
          setTimeout(() => {
            this.publishLoading = false
            this.$Notice.success({
              title: '保存成功',
              desc: '文章《' + this.articleTitle + '》保存成功'
            })
          }, 1000)
        }
      },
      handleSelectTag () {
        localStorage.tagsList = JSON.stringify(this.articleTagSelected)  // 本地存储文章标签列表
      }
    },
    computed: {
      completeUrl () {
        let finalUrl = this.fixedLink + this.articlePath
        localStorage.finalUrl = finalUrl  // 本地存储完整文章路径
        return finalUrl
      }
    },
    mounted () {
      this.articleTagList = [
        {value: 'vue'},
        {value: 'iview'},
        {value: 'ES6'},
        {value: 'webpack'},
        {value: 'babel'},
        {value: 'eslint'}
      ]
      this.classificationList = [
        {
          title: 'Vue实例',
          expand: true,
          children: [
            {
              title: '数据与方法',
              expand: true
            },
            {
              title: '生命周期',
              expand: true
            }
          ]
        },
        {
          title: 'Class与Style绑定',
          expand: true,
          children: [
            {
              title: '绑定HTML class',
              expand: true,
              children: [
                {
                  title: '对象语法',
                  expand: true
                },
                {
                  title: '数组语法',
                  expand: true
                },
                {
                  title: '用在组件上',
                  expand: true
                }
              ]
            },
            {
              title: '生命周期',
              expand: true
            }
          ]
        },
        {
          title: '模板语法',
          expand: true,
          children: [
            {
              title: '插值',
              expand: true
            },
            {
              title: '指令',
              expand: true
            },
            {
              title: '缩写',
              expand: true
            }
          ]
        }
      ]
      this.offenUsedClass = [
        {
          title: 'vue实例'
        },
        {
          title: '生命周期'
        },
        {
          title: '模板语法'
        },
        {
          title: '插值'
        },
        {
          title: '缩写'
        }
      ]
      tinymce.init({
        selector: '#articleEditor',
        branding: false,
        elementpath: false,
        height: 600,
        language: 'zh_CN.GB2312',
        menubar: 'edit insert view format table tools',
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
          'searchreplace visualblocks visualchars code fullscreen fullpage',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons paste textcolor colorpicker textpattern imagetools codesample'
        ],
        toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
        autosave_interval: '20s',
        image_advtab: true,
        table_default_styles: {
          width: '100%',
          borderCollapse: 'collapse'
        }
      })
    },
    destroyed () {
      tinymce.get('articleEditor').destroy()
    }
  }
</script>
