<template>
  <section class="login-container">
    <div class="login-wrapper">
      <div class="logo">
        <span>PUB Admin</span>
      </div>
      <Form :model="loginForm" ref="form">
        <FormItem prop="username">
          <Input v-model="loginForm.username" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem prop="password">
          <Input v-model="loginForm.password" type="password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem style="margin-bottom: 10px;text-align: center">
          <div class="profile">
            <span>Username: blogadmin</span>
            <span>password: blogadmin</span>
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" style="width: 100%" @click="login">登录</Button>
        </FormItem>
      </Form>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          code: ''
        },
        codeImg: ''
      }
    },
    created() {
      window.localStorage.clear()
      this.getVerifyCode()
    },
    methods: {
      getVerifyCode() {
        this.$store.dispatch('user/code').then(res => {
          if (res.state === 0) {
            this.codeImg =  res.data.image
          }
        })
      },
      login() {
        this.$store.dispatch('user/login', this.loginForm).then(res => {
          if (res.data.token) {
            this.$router.push('/')
          }
        }).catch(err => {
          if (err && err.data) {
            Object.entries(err.data).forEach(([key, value]) => {
              value.forEach(errText => {
                this.$Message.error(`${this.filterInput(key)}: ${errText}`)
              })
            })
          }
        })
      },
      filterInput(item) {
        return item === 'username' ? '用户名' : item === 'password' ? '密码' : '验证码'
      }
    },

  }
</script>

<style lang="less" scoped>
  @import "./Login";
</style>
