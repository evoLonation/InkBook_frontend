<template>
  <div class="register-layout">
    <div class="left-part">
      <div class="logo-and-name">
        <img src="../../assets/logo.png" class="logo" alt="">
      </div>
      <img src="../../assets/login/注册图片试用.png" class="left-pic" alt="">
    </div>
    <div class="right-part">
      <div class="right-container">
        <span class="register-in">注册</span>
        <div
          style="margin-top: 20px"
        >
          <el-input
            class="my-el-input"
            v-model="userId"
            placeholder="请输入用户名"
            @blur="checkName"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><user /></el-icon>
            </template>
          </el-input>
          <div
            style="height: 25px; padding-left: 10px"
          >
            <p v-if="nameCheckRes === 0" style="
                 font-size: 10px;
                 color: lightgreen;
            ">
              可用的用户名
            </p>
            <p v-else-if="nameCheckRes === 1" style="
                 font-size: 10px;
                 color: red;
            ">
              该用户名重复
            </p>
            <p v-else-if="nameCheckRes === 2" style="
                 font-size: 10px;
                 color: red;
            ">
              用户名只能由英文字符，数字组成
            </p>
            <p
                v-else
                style="font-size: 10px;"
            >
              &nbsp;
            </p>
          </div>
          <el-input
              v-model="pwd"
              class="my-el-input"
              placeholder="请输入密码"
              @blur="checkPwd"
              show-password
          >
            <template #prefix>
              <el-icon class="el-input__icon"><lock /></el-icon>
            </template>
          </el-input>
          <div
              style="height: 25px; padding-left: 10px"
          >
            <p v-if="(pwdCheckRes === 1 || pwdCheckRes === 2)" style="
                 font-size: 10px;
                 color: red;
            ">
              密码只能由6-20个数字，英文字母或下划线组成
            </p>
            <p
              v-else
              style="font-size: 10px"
            >
              &nbsp;
            </p>
          </div>
          <el-input
            class="my-el-input"
            v-model="confirm"
            placeholder="再次输入并确认密码"
            show-password
            style="margin-bottom: 25px;"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><check /></el-icon>
            </template>
          </el-input>
          <div
            style="display: flex"
          >
            <el-input
                v-model="email"
                @blur="checkEmail"
                style="width: 70%"
                class="my-el-input"
                placeholder="请输入邮箱"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><message /></el-icon>
              </template>
            </el-input>
            <el-button
              class="send-button"
              type="primary"
              @click="sendCode"
            >
              发送验证码
            </el-button>
          </div>
          <div
            style="height: 25px; padding-left: 10px"
          >
            <p v-if="emailCheckRes === 1" style="
                 font-size: 10px;
                 color: red;
            ">
              邮箱格式错误
            </p>
            <p
                v-else
                style="font-size: 10px"
            >
              &nbsp;
            </p>
          </div>
          <el-input
              v-model="code"
            class="my-el-input"
            placeholder="请输入验证码"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><document-checked/></el-icon>
            </template>
          </el-input>
          <span
            class="go-to-login"
            @click="goToLogin"
          >
            已有帐号，去登录
          </span>
          <div
            style="width: 100%; display: flex"
          >
            <el-button
              class="my-el-button"
              @click="register"
            >
              注册
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {DocumentChecked, Message} from "@element-plus/icons";

export default {
  name: "Register",
  components: {DocumentChecked, Message},
  data() {
    return {
      userId: '',
      pwd: '',
      confirm: '',
      email: '',
      code: '',
      trueCode: '',
      nameCheckRes: -1,
      emailCheckRes: 0,
      pwdCheckRes: -1,
      nameJudge: /^[A-Za-z\d]+$/,
      pwdJudge: /^\w+$/,
      emailJudge: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      //loginBg: 'url(' + require('../../assets/bk.jpg') + ')',
    }
  },
  // mounted() {
  //   document.body.style.backgroundSize = '100%'
  //   document.body.style.backgroundImage = this.loginBg
  // },
  methods: {
    checkName: function (){
      if (this.userId === ''){
        this.nameCheckRes = -1;
        return;
      }
      if (!this.nameJudge.test(this.userId)){
        this.nameCheckRes = 2;
        return;
      }
      this.nameCheckRes = 0;
      // this.$axios.get("user/register/check-id", {
      //   params:{
      //     userId: this.userId,
      //   }
      // }).then(res => {
      //   if(res.status === 200){
      //     console.log('名字正确')
      //     this.nameCheckRes = 0
      //   }else  ElMessage({message: res.data.js.msg, type: 'warning'});
      // }).catch(err => {
      //   console.log(err);         /* 若出现异常则在终端输出相关信息 */
      // })
    },

    checkPwd: function (){
      if (this.pwd === ''){
        this.pwdCheckRes = -1;
        return;
      }
      if (this.pwd.length < 6 || this.pwd.length > 20){
        this.pwdCheckRes = 2;
        return;
      }
      if (this.pwdJudge.test(this.pwd)) this.pwdCheckRes = 0;
      else  this.pwdCheckRes = 1;
    },

    checkEmail: function (){    //检查邮箱格式
      if (this.email === ''){
        this.emailCheckRes = -1;
        return;
      }
      if (this.emailJudge.test(this.email)) this.emailCheckRes = 0;
      else this.emailCheckRes = 1;
    },

    sendCode: function (){
      this.$axios.post("user/send-identifying",{
        "email" : this.email,
      }).then(res => {
        if (res.status === 200){
          console.log(res.data.code);
          this.trueCode = res.data.code;
          ElMessage('发送成功');

        }else  ElMessage({message: res.data.msg, type: 'warning'});
      }).catch(err => {
        console.log(err);
      })
    },

    goToLogin: function () {
      this.$router.push({name: 'login'});
    },

    register: function () {
      if (!(this.confirm === this.pwd)){
        ElMessage('两次输入的密码不一样')
        return
      }
      if(this.code === ''){
        ElMessage('请填写验证码')
        return;
      }
      console.log(this.nameCheckRes, this.emailCheckRes, this.pwdCheckRes)
      if (!(this.nameCheckRes === 0 && this.emailCheckRes === 0 && this.pwdCheckRes === 0)){
        ElMessage('请检查用户名,邮箱和密码是否合法')
        return;
      }


      this.$axios.post("user/register",{
        "userId": this.userId,
        "nickName" : this.userId, //可以为空
        "email" : this.email,
        "pwd" : this.pwd,
        "userCode" : this.code, //5位数字字符串
        "sendCode" : this.trueCode
      }).then(res => {
          ElMessage("注册成功！");
          this.$router.push({name: 'login', params:{}})

      }).catch(err => {
        console.log(err);
        ElMessage({message: err.response.data.msg, type: 'warning'});
      })
    }
  }
}
</script>

<style scoped>
.register-layout {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, white, #E2F5F7);
  display: flex;
  font-family: "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif !important;
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
  width: 90%;
  height: 90%;
  left: 10%;
  margin-top: 10px;
  position: relative;
  object-fit: contain;
}

.right-container {
  position: absolute;
  top: 45%;
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

.register-in {
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 32px;
  font-weight: bold;
}
.my-el-input {
  margin: 5px auto 0 0;
}

.my-el-input >>>.el-input__inner {
  font-size: 18px;
  line-height: 23px;
  height: 40px;
}

.my-el-input >>>.el-input__wrapper {
  border-radius: 30px;
}

.send-button {
  width: 25%;
  height: 40px;
  margin-top: 5px;
  margin-right: 0;
  border-radius: 30px;
}

.go-to-login {
  float: right;
  margin-top: 5px;
  cursor: pointer;
}

.go-to-login:hover {
  color: lightskyblue;
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
</style>