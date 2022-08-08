<template>
  <div style="
    width: 1000px;
    margin-left: 30px;
    margin-right: auto;
    margin-top: 80px;"
  >
    <el-card shadow="always" :body-style="{ padding: '0 0 0 0 ' }">
      <div v-if="isOwner === true" >
        <el-tabs v-model="cardSite" type="border-card" @tab-click="clean">
          <el-tab-pane label="个人信息" name="1">

            <div style="width: 80%; margin: 0 auto">
              <input type="file"
                     ref="clearFile"
                     style="display:none"
                     @change="upload($event)"/>
              <el-avatar :size="220" style="float: left; " @click="changeImg">
                <template #default>
                  <el-avatar :size="195" :src="url"/>
                </template>
              </el-avatar>
              <el-form
                  label-position="Right"
                  label-width="100px"
                  style="
              max-width: 100%;
              margin: 20px;
            ">
                <el-form-item label="用户名：">
                  {{ userId }}
                </el-form-item>

                <el-form-item label="用户昵称：">
                  {{ nickName }}
                </el-form-item>

                <el-form-item label="真实姓名：">
                  {{ realName }}
                </el-form-item>

                <el-form-item label="邮箱：">
                  {{ email }}
                </el-form-item>

                <el-form-item label="用户简介：">
                  {{ introduction }}
                </el-form-item>
              </el-form>

              <el-button type="danger" @click="logout" style="margin-left: 300px">
                退出登录
              </el-button>
            </div>

          </el-tab-pane>

          <!--      切换清空 邮箱 密码 时无法消除错误提示    -->

          <el-tab-pane label="修改信息" name="2">

            <div style="width: 80%; margin: 0 auto">
              <el-form
                  label-position="Right"
                  label-width="100px"
                  style="max-width: 460px"
              >
                <el-form-item label="用户昵称：">
                  <el-input type="text"
                            style="margin-bottom: 10px"
                            v-model="c_nickName"
                  />
                </el-form-item>

                <el-form-item label="真实姓名：">
                  <el-input type="text"
                            style="margin-bottom: 10px"
                            v-model="c_realName"
                  />
                </el-form-item>

                <el-form-item label="用户简介：">
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
                            style="margin-bottom: 10px"
                            v-model="c_introduction"
                  />
                </el-form-item>

                <el-form-item label="邮箱：">
                  <el-input type="text"
                            style="margin-bottom: 10px"
                            v-model="c_email"
                            @change="checkEmail">
                    <template #append>
                      <el-button  @click="sendCode" :disabled="!(emailCheckRes === 0)">发送验证码</el-button>
                    </template>
                  </el-input>
                  <p v-if="emailCheckRes === 1" style="
               font-size: 12px;
               color: red;
          ">
                    邮箱格式错误
                  </p>
                </el-form-item>

                <el-form-item label="验证码">
                  <el-input type="text"
                            v-model="c_code"
                            style="
                      width: 200px;
                      float: left ;"/>
                </el-form-item>


              </el-form>
              <el-button type="success"
                         @click="commit"
                         style="margin-left: 100px">
                提交修改
              </el-button>
            </div>

          </el-tab-pane>


          <el-tab-pane label="修改密码" name="3">

            <div style="width: 80%; margin: 0 auto">
              <el-form
                  label-position="Right"
                  label-width="100px"
                  style="max-width: 460px"
              >
                <el-form-item label="原密码：">
                  <el-input v-model="oldPwd" type="password"/>
                </el-form-item>

                <el-form-item label="新密码：">
                  <el-input v-model="newPwd" type="password" @change="checkPwd"/>
                  <p v-if="(pwdCheckRes === 1 || pwdCheckRes === 2)" style="
               font-size: 12px;
               color: red;
                ">
                    密码只能由6-20个数字，英文字母或下划线组成
                  </p>
                </el-form-item>



                <el-form-item label="确认密码：">
                  <el-input v-model="confirm" type="password" />
                </el-form-item>

                <div style="margin-left: 200px;">
                  <el-button type="success" @click="changePwd">
                    提交修改
                  </el-button>
                </div>

              </el-form>
            </div>

          </el-tab-pane>
        </el-tabs>
      </div>

      <div v-else>

        <div style="width: 80%; margin: 60px auto">
          <input type="file"
                 ref="clearFile"
                 style="display:none"
                 @change="upload($event)"/>
          <el-avatar :size="220" style="float: left; " @click="changeImg">
            <template #default>
              <el-avatar :size="195" :src="url"/>
            </template>
          </el-avatar>
          <el-form
              label-position="Right"
              label-width="100px"
              style="
              max-width: 100%;
              margin: 20px;
            ">
            <el-form-item label="用户名：">
              {{ userId }}
            </el-form-item>

            <el-form-item label="用户昵称：">
              {{ nickName }}
            </el-form-item>

            <el-form-item label="真实姓名：">
              {{ realName }}
            </el-form-item>

            <el-form-item label="邮箱：">
              {{ email }}
            </el-form-item>

            <el-form-item label="用户简介：">
              {{ introduction }}
            </el-form-item>
          </el-form>

        </div>
      </div>
    </el-card>


  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "UserInfo",
  data(){
    return {
      isOwner: -1,
      avatarUpdater: true,
      userId: '',
      url: '',
      cardSite: '1',
      nickName: '',
      realName: '',
      email: '',
      introduction: '',
      c_nickName: '',
      c_realName:'',
      c_email: '',
      c_introduction: '',
      c_code: '',
      trueCode: '',
      oldPwd: '',
      newPwd: '',
      confirm: '',
      emailCheckRes: -1,
      pwdCheckRes: -1,
      pwdJudge: /^\w+$/,
      emailJudge: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    }
  },
  methods: {

    clean: function (){
      this.c_nickName = '';
      this.c_introduction = '';
      this.c_realName = '',
      this.c_email = '';
      this.c_code = '';
      this.newPwd = '';
      this.oldPwd = '';
      this.confirm = '';
    },

    logout: function(){
      this.$store.commit("logout");
      this.$router.push({name: 'login'});
    },

    checkEmail: function (){    //检查邮箱格式
      if (this.c_email === ''){
        this.emailCheckRes = -1;
        return;
      }
      if (this.emailJudge.test(this.c_email)) this.emailCheckRes = 0;
      else this.emailCheckRes = 1;
    },

    checkPwd: function (){
      if (this.newPwd === ''){
        this.pwdCheckRes = -1;
        return;
      }
      if (this.newPwd.length < 6 || this.newPwd.length > 20){
        this.pwdCheckRes = 2;
        return;
      }
      if (this.pwdJudge.test(this.newPwd)) this.pwdCheckRes = 0;
      else  this.pwdCheckRes = 1;
    },

    changeImg: function (){
      console.log("changeImg is called!");
      return  this.$refs.clearFile.click();
    },

    upload: function(e){
      console.log("upload is called!")
      let getFile =document.getElementById("files");
      // getFile.onchange=function(e){
      //获取到文件以后就会返回一个对象，通过这个对象即可获取文件
      console.log(e.currentTarget.files);//所有文件，返回的是一个数组
      console.log(e.currentTarget.files[0].name)//文件名
      let form = new FormData();
      form.append("file",e.currentTarget.files[0]);
      form.append("userId", this.$store.state.loginUser.userId)
      this.axios.post("user/modify/avatar",form).then((response)=>{
        if(response.status === 200){
          ElMessage("上传成功！");
          console.log(response.data);
          // location.reload();
          this.getAvatar();
        }else ElMessage({message: response.data.msg, type: 'warning'});
      }).catch((err)=>{
        console.log(err);
      });
    },

    changeRealname: function (){
      console.log('changeRealname is called!')
      this.$axios.post("user/modify/realname",
          {
            "userId" : this.userId,
            "newReal" : this.c_realName,
          }).then((res)=>{
        if (res.status === 200){
          ElMessage("修改姓名成功！");
          this.realName = this.c_realName;

        }else ElMessage({message: res.data.msg, type: 'warning'});
      }).catch((err)=>{
        console.log(err);
      })
    },

    changeNickname: function (){
      console.log('changeNickname is called!')
      this.$axios.post("user/modify/nickname",
          {
            "userId" : this.userId,
            "newNick" : this.c_nickName,
          }).then((res)=>{
        if (res.status === 200){
            ElMessage("修改昵称成功！");
            this.nickName = this.c_nickName;
          this.$store.commit({type: 'login', userId: this.userId, nickname: this.nickName})
        }else ElMessage({message: res.data.msg, type: 'warning'});
      }).catch((err)=>{
        console.log(err);
      })
    },

    changeIntroduction: function (){
      console.log('changeIntroduction is called!');
      this.$axios.post("user/modify/introduction",
          {
            "userId" : this.userId,
            "newIntro" : this.c_introduction,
          }).then((res)=>{
        if (res.status === 200){
            ElMessage("修改简介成功！");
            this.introduction = this.c_introduction;

        }else ElMessage({message: res.data.msg, type: 'warning'});
      }).catch((err)=>{
        console.log(err);
      })
    },

    changeEmail: function (){
      console.log('changeEmail is called !');
      this.$axios.post("user/modify/email",
          {
            "userId" : this.userId,
            "newEmail" : this.c_email,
            "userCode" : this.c_code,
            "sendCode" : this.trueCode
          }).then((res)=>{
        if (res.status === 200){
          ElMessage("修改邮箱成功！");
          this.email = this.c_email;

        }else ElMessage({message: res.data.msg, type: 'warning'});
      }).catch((err)=>{
        console.log(err);
      })
    },

    commit: function (){
      if (!(this.c_realName === ''))this.changeRealname();
      if (!(this.c_nickName === ''))this.changeNickname();
      if (!(this.c_introduction === ''))this.changeIntroduction();
      if (!(this.c_email === ''))this.changeEmail();

      this.getInformation();
      this.cardSite = '1';
    },

    sendCode: function (){
      this.$axios.post("user/send-identifying", {
        "email": this.c_email,
      }).then((response)=>{
        if (response.status === 200){
          ElMessage("发送成功");
          console.log(response.data.code)
          this.trueCode = response.data.code;
        }else ElMessage({message: response.data.msg, type: 'warning'});
      }).catch((err)=>{
        console.log(err);
      });
    },

    changePwd :function (){
      if (!(this.newPwd === this.confirm)){
        ElMessage('两次输入密码不同');
        return;
      }
      this.$axios.post("user/modify/password",
          {
            "userId" : this.userId,
            "newPwd" : this.newPwd,
            "oldPwd" : this.oldPwd,
          }).then((res)=>{
        if (res.status === 200){
          ElMessage("修改密码成功！");

        }else ElMessage({message: res.data.msg, type: 'warning'});
      }).catch((err)=>{
        console.log(err);
      })

      this.cardSite = '1';
    },

    getInformation: function (){
      console.log('get user information');
      this.$axios.get("user/information", {
        params:{
          userId: this.userId,
        }
      }).then((response)=>{
        if (response.status === 200){
          console.log('user data.js');
          console.log(response.data);
          this.realName = response.data.realname;
          this.nickName = response.data.nickname;
          this.email = response.data.email;
          this.introduction = response.data.intro;
        }else ElMessage({message: response.data.msg, type: 'warning'});
      }).catch((err)=>{
        console.log(err);
      });
    },

    getAvatar: function (){
      console.log('get avatar')
      // this.$axios.get("user/get-avatar", {
      //   params:{
      //     userId: this.userId,
      //   }
      // }).then((response)=>{
      //   if (response.status === 200){
      //     console.log(response.data.js)
      this.url = 'http://43.138.71.108/api/user/get-avatar/?userId=' + this.userId;
      console.log(this.url)
      //   }else ElMessage({message: response.data.js.msg, type: 'warning'});
      // }).catch((err)=>{
      //   console.log(err);
      // });
    },
  },

  created() {
    this.isOwner = (this.$route.params.userId === this.$store.state.loginUser.userId);
    this.userId = this.$route.params.userId;
    console.log(this.$store.state.isLogin)
    this.getInformation();
    this.getAvatar();
  },
  updated() {
    this.isOwner = (this.$route.params.userId === this.$store.state.loginUser.userId);
    this.userId = this.$route.params.userId;

    this.getInformation();
    this.getAvatar();
  },
}
</script>

<style scoped>

</style>