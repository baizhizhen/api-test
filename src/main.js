import Vue from 'vue'
import iView from 'iview'
import { router } from './router/index'
import { appRouter } from './router/router'
import store from './store'
import App from './app.vue'
import '@/locale'
import 'iview/dist/styles/iview.css'
import VueI18n from 'vue-i18n'
import util from '@/libs/util'
import * as _ from 'lodash'

Vue.use(VueI18n)
Vue.use(iView)

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  data: {
    currentPageName: ''
  },
  mounted () {
    this.currentPageName = this.$route.name
    /**
     * 将localStorage里面的配置加载到store里面
     * */
    this.$store.commit('setOpenedList')
    this.$store.commit('initCachepage')
    // 权限菜单过滤相关
    this.$store.commit('updateMenulist')
    // iview-admin检查更新
    util.checkUpdate(this)
  },
  created () {
    let tagsList = []
    _.map(appRouter, (item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  }
})
