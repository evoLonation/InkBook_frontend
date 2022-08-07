<template >
  <div class="login-layout">
    <div class="left-part">
      <div class="logo-and-name">
        <img src="../../assets/logo.png" class="logo" alt=""/>
<!--        <span class="name">墨书</span>-->
      </div>
      <img class="left-pic" src="../../assets/login/登录图片试用.png" alt=""/>
    </div>
    <div class="right-part">
      <div class="right-container">
        <span class="sign-in">登录</span>
        <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            class="switch-content"
        >
          <el-tab-pane label="密码登录" name="first">
            <el-input
                v-model="userId"
                placeholder="请输入用户名"
                class="my-el-input"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><user /></el-icon>
              </template>
            </el-input>
            <el-input
                v-model="pwd"
                placeholder="请输入密码"
                class="my-el-input"
                show-password
            >
              <template #prefix>
                <el-icon class="el-input__icon"><lock /></el-icon>
              </template>
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="邮箱登录" name="second">
            <el-input
                v-model="userId"
                placeholder="请输入邮箱"
                class="my-el-input"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><user /></el-icon>
              </template>
            </el-input>
            <el-input
                v-model="pwd"
                placeholder="请输入密码"
                class="my-el-input"
                show-password
            >
              <template #prefix>
                <el-icon class="el-input__icon"><lock /></el-icon>
              </template>
            </el-input>
          </el-tab-pane>
          <span
              class="go-to-register"
              @click="goToRegister"
          >
            没有账号，去注册
          </span>
          <div
            style="width: 100%; display: flex"
            @click="login"
          >
            <el-button
                class="my-el-button"
            >
              登录
            </el-button>
          </div>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Login",
  data() {
    return {
      userId: null,
      email: null,
      pwd: null,
      activeName: 'first',
    }
  },
  methods: {
    // 这为tab-click所用
    // tabClick: function (tab, event) {
    //   console.log(tab, event);
    // },

    handleClick: function (){
      this.userId = null;
      this.pwd = null;
      this.email = null;
    },
    // 需要具体分密码错误 or 用户名不存在？

    login: function () {
      console.log('login is called!');
      console.log(this.userId);
      console.log(this.pwd)
      console.log(this.email)
      console.log(typeof(this.pwd))
      this.$axios.get("user/login", {
        params: {
          userId: this.userId,
          email: this.email,
          pwd: this.pwd,
        }
      }).then((response)=>{
        console.log(response.data)
        this.$store.commit({type: 'login', userId: response.data.userId, nickname: response.data.nickName})
        console.log(this.$store.state.loginUser.userId);
        ElMessage('登录成功');
        this.$router.push({name: 'Table', params:{}})

      }).catch((err)=>{
        console.log(err);
        ElMessage({message: err.response.data.msg, type: 'warning'});
      });
    },

    goToRegister: function () {
      this.$router.push({name: 'Register'});
    }
  }
}
</script>

<style scoped>
.login-layout {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, white, #E2F5F7);
  display: flex;
  font-family: "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif !important;;
}

.left-part {
  width: 50%;
  min-height: 100vh;
}

.right-part {
  width: 50%;
  min-height: 100vh;
}

.logo-and-name {
  position: absolute;
  top: 30px;
  left: 75px;
  width: 96px;
  height: 72px;
}

.logo {
  width: 96px;
}

.left-pic {
  width: 100%;
  height: 100%;
  position: relative;
  object-fit: contain;
}

.right-container {
  position: absolute;
  top: 50%;
  right: 50%;
  margin-right: -650px;
  background: #FFF;
  border-radius: 32px;
  box-shadow: 0 16px 32px 0 rgb(0 0 0 / 8%);
  transform: translateY(-50%);
  padding: 64px;
  width: 92%;
  max-width: 488px;
}

.sign-in {
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 32px;
  font-weight: bold;
}

.switch-content {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}

.my-el-input {
  margin: 30px auto 0 auto;
}

.my-el-input >>>.el-input__inner {
  font-size: 23px;
  line-height: 28px;
  height: 50px;
}

.my-el-input >>>.el-input__wrapper{
  border-radius: 30px;
}

.my-el-button {
  width: 150px;
  height: 50px;
  color: gray;
  font-size: 23px;
  line-height: 28px;
  border-radius: 30px;
  background-color: #E2F5F7;
  margin: 20px auto 0 auto;
}

.my-el-button:hover {
  color: lightskyblue;
}

.go-to-register {
  float: right;
  margin-top: 5px;
  cursor: pointer;
}

.go-to-register:hover {
  color: lightskyblue;
}
</style>