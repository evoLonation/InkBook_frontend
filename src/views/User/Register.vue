<template>
  <div class="register-layout">

  </div>
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
        if (res.status === 200){
          ElMessage("注册成功！");
          this.$router.push({name: 'login', params:{}})

        }else  ElMessage({message: res.data.msg, type: 'warning'});
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
.register-layout {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, white, #E4D2F8);
  display: flex;
  font-family: "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif !important;
}
</style>