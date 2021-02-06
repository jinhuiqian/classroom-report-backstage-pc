<template>
  <div class="container">
    <h1 class="title">实验(实训)室报告后台系统</h1>
    <div class="form-box">
      <v-form ref="form" v-model="valid" lazy-validation class="col">
        <v-text-field v-model="account" :rules="accountRule" label="手机号/工号" required v-if="isPwd"></v-text-field>
        <v-text-field
          v-model="phone"
          :counter="11"
          v-if="!isPwd"
          :rules="phoneRule"
          label="手机号"
          required
        ></v-text-field>
        <v-text-field v-model="password" :rules="passRule" label="密码" required v-if="isPwd"></v-text-field>
        <div class="captcha" v-if="!isPwd">
          <v-text-field v-model="captcha" label="验证码" required style="width: 60%"></v-text-field>
          <button type="button" class="code-btn" @click="getCode">{{ codeTime > 0 ? codeTime + ' s' : '获取验证码' }}</button>
        </div>
        <div class="loginWay">
          <div class="btn iconfont icon-mima" @click="usePassword">
            <div class="font">密码登录</div>
          </div>
          <div class="btn iconfont icon-yanzhengma" @click="useCaptcha">
            <div class="font">验证码登录</div>
          </div>
          <div class="btn iconfont icon-weixin">
            <div class="font">微信登录</div>
          </div>
        </div>
        <v-btn color="primary" class="login" @click="judgement">登录</v-btn>
      </v-form>
    </div>
    <v-alert type="error" v-if="phoneValidate"> 手机号格式错误 </v-alert>
    <v-alert type="success" v-if="isUsePhone"> 使用手机号 </v-alert>
    <v-alert type="success" v-if="isUseNum"> 使用工号 </v-alert>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isPwd: true,
    valid: true,
    phone: '',
    account: '',
    phoneRule: [(v) => !!v || '手机号不能为空', (v) => (v && v.length === 11) || '手机号必须11位'],
    accountRule: [(v) => !!v || '账号不能为空'],
    passRule: [(v) => !!v || '密码不能为空'],
    password: '',
    captcha: '',
    phoneValidate: false,
    codeTime: 0,
    isUsePhone: false,
    isUseNum: false
  }),
  methods: {
    //切换登录方式
    usePassword() {
      this.isPwd = true
    },
    useCaptcha() {
      this.isPwd = false
    },
    //验证手机号格式
    validate() {
      var mPattern = /^1[34578]\d{9}$/
      if (!mPattern.test(this.phone)) {
        this.phoneValidate = true
        return false
      }
      this.phoneValidate = false
      return true
    },
    //获取验证码
    getCode() {
      //防止重复获取
      if (this.codeTime > 0) {
        return
      }
      //验证手机号
      if (!this.validate()) return
      //请求数据
      // this.$H
      //   .post('/user/sendcode?phone=' + this.phone, {
      //     native: true,
      //   })
      //   .then((res) => {
      //倒计时
      this.codeTime = 60
      let timer = setInterval(() => {
        if (this.codeTime >= 1) {
          this.codeTime--
        } else {
          this.codeTime = 0
          clearInterval(timer)
        }
      }, 1000)
      // })
    },
    //密码登录判断手机号或工号
    judgement() {
      let length = this.account.length
      console.log(length)
      if (length == 10) {
        console.log('工号')
        this.isUseNum = true
        this.isUsePhone = false
      } else if (length == 11) {
        console.log('手机号')
        this.isUsePhone = true
        this.isUseNum = false
      }
    },
  },
}
</script>

<style scoped>
button {
  outline: none;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.title {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  color: rgb(0, 195, 255);
}
.form-box {
  padding: 20px 20px 0 20px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 42%;
  z-index: 10;
  border-radius: 10px;
  background-color: rgb(247, 241, 215);
}
.loginWay {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}
.btn {
  display: flex;
  flex-direction: column;
  width: 33%;
  margin: 0 20px;
  text-align: center;
  font-size: 32px;
}
.icon-mima {
  color: rgb(241, 78, 78);
}
.icon-yanzhengma {
  color: rgb(199, 181, 17);
}
.icon-weixin {
  color: rgb(55, 185, 29);
}
.font {
  font-size: 13px;
  color: #6b6b6b;
}
.login {
  position: absolute;
  top: 82%;
  left: 50%;
  transform: translateX(-50%);
  width: 88%;
}
.captcha {
  display: flex;
}
.code-btn {
  text-align: center;
  width: 30%;
  height: 42px;
  padding: 8px;
  margin-left: 10px;
  margin-top: 5px;
  border-radius: 3px;
  border: 1px solid #ddd;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
}
</style>
