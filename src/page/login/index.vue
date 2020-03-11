<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <el-form :model="form" class="form-content">
        <el-form-item prop="mobile" label="账户">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="agree" class="login-agree">
          <el-checkbox class="agree-checkbox" v-model="form.agree"></el-checkbox>
          <span class="agree-text">
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item class="btn-login">
          <el-button
          type="primary"
          @click="handleLogin"
          >登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'
import { saveUser, saveUserName } from '@/utils/auth'

const initCodeTimeSeconds = 60
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        username: 'admin',
        password: 'admin',
        agree: ''
      },
      codeTimer: null, // 倒计时定时器
      codeTimeSeconds: initCodeTimeSeconds, // 定时器事件
      loadingLogin: false,
      codeLoading: false
    }
  },
  created () {

  },
  methods: {
    handleSendCode () {

    },

    async handleLogin () {
      try {
        const formData = new FormData()
        formData.append('username', this.form.username)
        formData.append('password', this.form.password)
        const res = await userLogin(formData)
        const userInfo = res.data.result.sessionid
        const username = this.form.username
        saveUser(userInfo)
        saveUserName(username)
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
        this.$router.push('/')
      } catch (err) {
        this.$message({
          message: '警告哦，登录失败',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  padding-top: 280px;
  .el-form, .form-content {
    padding: 30px 15px;
    background-color: #c183fb;
    border-radius: 10px;
    .el-form-item {
      display: flex;
      justify-content: center;
    }
    /deep/.el-form-item__content{
      width: 300px;
    }
    .login-agree {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }
    .btn-login {
      margin-bottom: 0;
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>>
