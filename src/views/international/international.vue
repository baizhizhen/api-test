<style lang="less">
    @import './international.less';
</style>

<template>
    <div>
        <i-row :gutter="10">
            <i-col span="4">
                <i-card>
                    <p slot="title">
                        <i-icon type="ios-toggle"></i-icon>
                        {{ $t('switchLangTitle') }}
                    </p>
                    <i-row type="flex" justify="center" align="middle" class="switch-language-row1">
                        <i-radio-group :value="lang" @on-change="handleSwitch" vertical>
                            <i-radio label="zh-CN">
                                <span>中文简体</span>
                            </i-radio>
                            <i-radio label="zh-TW">
                                <span>中文繁體</span>
                            </i-radio>
                            <i-radio label="en-US">
                                <span>English</span>
                            </i-radio>
                        </i-radio-group>
                        <p class="switch-language-tip">{{ $t('tip') }}</p>
                    </i-row>
                </i-card>
            </i-col>
            <i-col span="20">
                <i-card>
                    <p slot="title">
                        <i-icon type="ios-cog"></i-icon>
                        {{ $t('iviewComponentTitle') }}
                    </p>
                    <i-row :gutter="10" type="flex" justify="center" align="middle" class="switch-language-row1">
                        <i-col span="4" offset="1">
                            <p>{{ $t('intro') }}</p>
                        </i-col>
                        <i-col span="6" offset="1">
                            <i-input :placeholder="placeholderText" style="width: 100%;"></i-input>
                            <div style="margin-top: 25px;">
                                <i-date-picker type="date" :placeholder="placeholderDate"
                                               style="width: 100%;"></i-date-picker>
                            </div>
                            <div style="margin-top: 25px;">
                                <i-rate show-text v-model="valueText"></i-rate>
                            </div>
                        </i-col>
                        <i-col span="6">
                            <i-table :columns="columnsI18n" :data="dataI18n"></i-table>
                        </i-col>
                        <i-col span="6">
                            <i-button type="primary" @click="showModal = true" long>{{ $t('btnText') }}</i-button>
                            <i-modal v-model="showModal" title="iView">
                                <p>{{ $t('modalText') }}</p>
                            </i-modal>
                            <div style="margin-top: 25px;">
                                <i-poptip confirm :title="$t('poptip')">
                                    <i-button type="primary" long>{{ $t('showPoptipText') }}</i-button>
                                </i-poptip>
                            </div>
                        </i-col>
                    </i-row>
                </i-card>
            </i-col>
        </i-row>
    </div>
</template>

<script>
  export default {
    name: 'international_index',
    data () {
      return {
        lang: 'zh-CN',
        valueText: 3,
        showModal: false,
        columnsI18n: [
          {
            key: 'name',
            title: this.$t('name')
          },
          {
            key: 'company',
            title: this.$t('company')
          }
        ],
        dataI18n: [
          {
            name: 'Aresn',
            company: 'TalkingData'
          },
          {
            name: 'Lison',
            company: 'TalkingData'
          },
          {
            name: 'Lucy',
            company: 'TalkingData'
          }
        ]
      }
    },
    methods: {
      handleSwitch (lang) {
        this.lang = lang
        localStorage.lang = lang
        this.$store.commit('switchLang', lang)  // 如果你要自己实现多语言切换，那么只需要执行这行代码即可，修改语言类型

        this.columnsI18n = [
          {
            key: 'name',
            title: this.$t('name')
          },
          {
            key: 'company',
            title: this.$t('company')
          }
        ]  // 像iview的table组件这样一次渲染如果数据不更新视图就不更新的组件，如果切换语言需要更新一下数据才能切换组件内的多语言
      }
    },
    computed: {
      placeholderText () {
        return this.$t('placeholderText')
      },
      placeholderDate () {
        return this.$t('placeholderDate')
      }
    },
    created () {
      this.lang = localStorage.lang || 'zh-CN'
    }
  }
</script>
