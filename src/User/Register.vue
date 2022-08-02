<template>

  <div class="register">
    <div style="margin-left: auto;margin-right: auto;width: 100px">
      <img src="../assets/logo.png" alt="logo" style="width: 100px"/>
    </div>
    <div style="margin:0px auto 10px auto; width: 80px; ">
      <h2 class="title" style="margin:0 auto">注册</h2>
    </div>
    <div class="Wireframe" style="background-color: rgba(255,255,255,0.5)">

      <el-form
          label-position= "top"
          label-width="100px"
          style="max-width: 460px"
      >

        <el-form-item label="用户名">
          <el-input v-model="userId" @blur="checkName" />
        </el-form-item>
        <div>
          <p v-if="nameCheckRes === 0" style="
               font-size: 12px;
               color: lightgreen;
          ">
            可用的用户名
          </p>
          <p v-if="nameCheckRes === 1" style="
               font-size: 12px;
               color: red;
          ">
            该用户名重复
          </p>
          <p v-if="nameCheckRes === 2" style="
               font-size: 12px;
               color: red;
          ">
            用户名只能由英文字符，数字组成
          </p>
        </div>

        <el-form-item label="密码">
          <el-input v-model="pwd" type="password" @blur="checkPwd"/>
        </el-form-item>
        <p v-if="(pwdCheckRes === 1 || pwdCheckRes === 2)" style="
               font-size: 12px;
               color: red;
          ">
          密码只能由6-20个数字，英文字母或下划线组成
        </p>

        <el-form-item label="确认密码">
          <el-input v-model="confirm" type="password" />
        </el-form-item>

        <el-form-item label = "邮箱">
          <el-input v-model="email" type="text" @blur="checkEmail">
            <template #append>
              <el-button type="primary"
                         @click="sendCode"
                         :disabled="!(emailCheckRes === 0)">
                发送验证码
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <p v-if="emailCheckRes === 1" style="
               font-size: 12px;
               color: red;
          ">
          邮箱格式错误
        </p>

        <el-form-item label="验证码">
          <el-input v-model="code" type="text" style="width:70%"/>
        </el-form-item>

      </el-form>

      <el-button type="success" @click="register"
                 style="margin: 0 auto">
        注册
      </el-button>

      <router-link to="/login" style="
              font-size: 12px;
              position: absolute;
              bottom: 15px;
              right: 20px;
        ">
        已有账号？点击登录
      </router-link>
    </div>

  </div><br>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Register",
  data() {
    return {
      userId: '',
      pwd: '',
      confirm: '',
      email: '',
      code: '',
      trueCode: '',
      nameCheckRes: 0,
      emailCheckRes: -1,
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

      this.$axios.get("user/register/check-id", {
        params:{
          userId: this.userId,
        }
      }).then(res => {
        if(res.status === 200){
          console.log('名字正确')
        }else  ElMessage({message: res.data.msg, type: 'warning'});
      }).catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      })
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

    register: function () {
      if (!(this.confirm === this.pwd)){
        ElMessage('两次输入的密码不一样')
        return
      }
      if(this.code === ''){
        ElMessage('请填写验证码')
        return;
      }
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
        if (res.status === 200){
          if(res.data.code === 0) {
            ElMessage("注册成功！");
            this.$router.push({name: 'login', params:{}})
          }
        }else  ElMessage({message: res.data.msg, type: 'warning'});
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
img {
  width: 80px;
}
.title {
  font-size: 25px;
  text-align: center;
}
.Wireframe {
  position: relative;
  margin: auto auto;
  width: 400px;
  border-style:solid;
  border-color: lightgray;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
}
</style>