<template>
  <div class="container">
    <h1 class="title">实验(实训)室报告后台系统</h1>
    <div class="form-box">
      <v-form ref="form" v-model="valid" lazy-validation class="col">
        <v-text-field v-model="phone" :counter="11" :rules="phoneRule" label="手机号" required></v-text-field>
        <v-text-field v-model="password" :rules="passRule" label="密码" required></v-text-field>
        <div class="loginWay">
          <div class="btn iconfont icon-mima">
            <div class="font">密码登录</div>
          </div>
          <div class="btn iconfont icon-yanzhengma">
            <div class="font">验证码登录</div>
          </div>
          <div class="btn iconfont icon-weixin">
            <div class="font">微信登录</div>
          </div>
        </div>
        <v-btn color="primary" class="login">登录</v-btn>
      </v-form>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
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
  padding: 20px 20px 10px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 30%;
  height: 45%;
  z-index: 10;
  border-radius: 10px;
  background-color: rgb(247, 241, 215);
}

.loginWay {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
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
  left: 50%;
  transform: translateX(-50%);
  width: 88%;
}
</style>
