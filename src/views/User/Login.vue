<template >
  <div class="login">
    <div style="margin-left: auto;margin-right: auto;width: 100px">
     <img src="../../assets/logo.png" alt="logo" style="width: 100px"/>
    </div>
    <div style="margin:0px auto 10px auto; width: 80px; ">
      <h2 class="title" style="margin:0 auto">登录</h2>
    </div>
    <div class="Wireframe" style="background-color: rgba(255,255,255,0.5)">
      <el-tabs :model-value="activeName" class="demo-tabs" stretch @tab-click="handleClick">
        <el-tab-pane label="用户名登录" name="first">

          <el-form
              label-position= "top"
              label-width="100px"
              style="max-width: 460px"
          >

            <el-form-item label="用户名">
              <el-input v-model="userId" />
            </el-form-item>

            <el-form-item label="密码">
              <el-input v-model="pwd" type="password" class="password" @keyup.enter="login" />
            </el-form-item>

          </el-form>
          <el-button type="success" @click="login">登录</el-button>

        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="second">

          <el-form
              label-position= "top"
              label-width="100px"
              style="max-width: 460px"
          >

            <el-form-item label="邮箱">
              <el-input v-model="email" />
            </el-form-item>

            <el-form-item label="密码">
              <el-input v-model="pwd" type="password" class="password" @keyup.enter="login" />
            </el-form-item>

          </el-form>
          <el-button type="success" @click="login">登录</el-button>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

  <br>
  <div class="Wireframe">
<!--    <router-link to="">忘记密码？</router-link>-->
<!--    &nbsp-->
    <router-link to="/register">没有账号？点击注册</router-link>
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
      loginBg: 'url(' + require('../../assets/login/bk.jpg') + ')'
    }
  },
  mounted() {
    document.body.style.backgroundSize = '100%'
    document.body.style.backgroundImage = this.loginBg
  },
  methods: {
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
  margin: 0 auto;
  width: 400px;
  border-style:solid;
  border-color: lightgray;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
}
</style>