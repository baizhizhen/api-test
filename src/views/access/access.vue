<style lang="less">
    @import '../../styles/common.less';
    @import './access.less';
</style>

<template>
    <div class="access">
        <i-row>
            <i-col span="8">
                <i-card>
                    <p slot="title">
                        <i-icon type="android-contact"></i-icon>
                        当前用户
                    </p>
                    <div class="access-user-con access-current-user-con">
                        <img :src="avatorPath" alt="">
                        <p>当前用户权限值:<b>{{ accessCode }}</b></p>
                    </div>
                </i-card>
            </i-col>
            <i-col span="16" class="padding-left-10">
                <i-card>
                    <p slot="title">
                        <i-icon type="android-contacts"></i-icon>
                        不同权限用户的不同菜单
                    </p>
                    <div class="access-user-con access-change-access-con">
                        <i-col span="8">
                            <i-row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <i-switch :value="switchValue" @on-change="changeAccess" size="large"></i-switch>
                            </i-row>
                        </i-col>
                        <i-col span="16" class="padding-left-10">
                            <i-row type="flex" justify="center" align="middle" class="access-change-access-con-row">
                                <p>您可以通过左侧的开关来切换当前用户的权限值，然后您可以观察左侧菜单栏的变化，如果当前用户的权限值是<b> 0 </b>，则左侧菜单栏会显示’权限测试页‘这一项('权限测试页'只用于测试，点击不会跳转)。
                                </p>
                            </i-row>
                        </i-col>
                    </div>
                </i-card>
            </i-col>
        </i-row>
    </div>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    name: 'access_index',
    data () {
      return {
        accessCode: parseInt(Cookies.get('access')),
        switchValue: parseInt(Cookies.get('access')) === 1
      }
    },
    computed: {
      avatorPath () {
        return localStorage.avatorImgPath
      }
    },
    methods: {
      changeAccess (res) {
        if (res) {
          this.accessCode = 1
          Cookies.set('access', 1)
        } else {
          this.accessCode = 0
          Cookies.set('access', 0)
        }

        /**
         * 权限发生变化以后，通过权限过滤的菜单项也要发生变化*/
        this.$store.commit('updateMenulist')
      }
    }
  }
</script>

<style>

</style>
