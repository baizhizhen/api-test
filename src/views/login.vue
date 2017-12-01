<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <i-card :bordered="false">
                <p slot="title">
                    <i-icon type="log-in"></i-icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <i-form ref="loginForm" :model="form" :rules="rules">
                        <i-form-item prop="userName">
                            <i-input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <i-icon :size="16" type="person"></i-icon>
                                </span>
                            </i-input>
                        </i-form-item>
                        <i-form-item prop="password">
                            <i-input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <i-icon :size="14" type="locked"></i-icon>
                                </span>
                            </i-input>
                        </i-form-item>
                        <i-form-item>
                            <i-button @click="handleSubmit" type="primary" long>登录</i-button>
                        </i-form-item>
                    </i-form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </i-card>
        </div>
    </div>
</template>

<script>
  import Cookies from 'js-cookie'

  export default {
    data () {
      return {
        form: {
          userName: 'iview_admin',
          password: ''
        },
        rules: {
          userName: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            Cookies.set('user', this.form.userName)
            Cookies.set('password', this.form.password)
            this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg')
            if (this.form.userName === 'iview_admin') {
              Cookies.set('access', 0)
            } else {
              Cookies.set('access', 1)
            }
            this.$router.push({
              name: 'home_index'
            })
          }
        })
      }
    }
  }
</script>

<style>

</style>
