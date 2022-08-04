<template>
  <div
    style="
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, deepskyblue, royalblue);
    position: fixed;
    top: 0;
    left: 0"
  >
    <vue-particles
      class="login-bg"
      color="#f4f4f4"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#f4f4f4"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    />
    <div id="invitation">
      <div
        style="display: flex; height: 150px; width: 100%; border-bottom: 1px dashed lightgray"
      >
        <el-avatar
            style="width: 80px; height: 80px; border: 1px solid dimgray; margin:  auto 0 auto 50px;"
            :src="TeamImg" fit="cover"/>
        <div
            style="display: block; text-align: left; margin-left: 30px"
        >
          <div
            style="width: 100%; height: 25px; font-size: 25px; margin: 40px auto 0 auto"
          >
            <span style="font-weight: 1000">{{TeamName}}</span>
          </div>
          <div
            style="width: 100%; height: 14px; font-size: 14px; margin: 20px auto auto auto"
          >
            <span>{{TeamIntro}}</span>
          </div>
        </div>
      </div>
      <div v-if="isJoining">
        <el-button
            type="success"
            style="margin-top: 70px; margin-left: 145px; width: 150px"
            @click="JoinTeam"
            v-if="!isJoined"
        >
          同意加入团队
        </el-button>
        <el-button
            type="warning"
            style="margin-top: 70px; margin-left: 145px; width: 150px"
            v-else
            disabled
        >
          成功加入团队
        </el-button>
      </div>
      <div
        v-else
      >
        <el-input
          v-model="UserName"
          placeholder="请输入用户名"
          style="width: 350px; height: 30px; margin: 25px auto 0 49px"
        >
        </el-input>
        <el-input
            v-model="UserPassword"
            placeholder="请输入密码"
            style="width: 350px; height: 30px; margin: 25px auto 0 49px"
            show-password
        >
        </el-input>
        <el-button
          type="success"
          style="width: 150px; margin: 25px auto auto 145px"
          @click="MeLogin"
        >
          登录我的账户
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamInvite",
  data() {
    return {
      UserName: '',
      UserPassword: '',
      TeamId: -1,
      TeamName: '',
      TeamIntro: '',
      TeamImg: '',
      isJoining: false,
      isJoined: false
    }
  },
  methods: {
    JoinTeam: function () {
      console.log(this.UserName)
      console.log(this.TeamId);
      console.log(typeof (this.TeamId))
      // this.$axios.post("team/confirm", {
      //   "teamId": this.TeamId,
      //   "userId": this.UserName,
      // }).then((res)=>{
      //   if(res.status === 200){
      //     this.$message.success("成功加入团队");
      //     this.isJoined = true;
      //   }
      // }).catch(err=>{
      //   console.log(err);
      // })
      console.log(this.TeamId);
      console.log(this.UserName);
      this.$axios.post("team/confirm", {
        "teamId": this.TeamId,
        "userId": this.UserName,
      }).then((res)=>{
        if(res.status === 200){
          this.$message.success(res.data.msg);
          this.isJoined = true;
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    getTeamInformation: function () {
      // 获取团队文字信息
      this.$axios.get("team/information", {
        params: {
          teamId: this.TeamId,
        }
      }).then(res =>{
        if(res.status === 200){
          console.log('get information data.js = ');
          console.log(res.data);
          this.TeamName = res.data.name;
          this.TeamIntro = res.data.intro;
        }
      }).catch(err => {
        console.log(err);
      })

      this.TeamImg = 'http://43.138.71.108/api/team/get-avatar/?teamId=' + this.TeamId;
    },
    MeLogin: function () {
      if(this.UserName === ''){
        this.$message.error("用户名不能为空！");
        return;
      }
      if(this.UserPassword === ''){
        this.$message.error("密码不能为空！");
        return;
      }

      console.log("MeLogin is called");
      this.$axios.get("user/login", {
        params: {
          userId: this.UserName,
          pwd: this.UserPassword
        }
      }).then((res)=>{
        console.log(res.data.msg)
        if(res.status === 200){
          console.log(res.data);
          this.$message.success(res.data.msg);
          this.isJoining = true;
          console.log(this.TeamId);
          console.log(this.UserName);
          this.$axios.post("team/apply", {
            "teamId": this.TeamId,
            "userId": this.UserName,
          }).then((res)=>{
            console.log(res.status);
            if(res.status === 200) {
              console.log(res.data.code);
              if (res.data.code === 1) {
                this.$message.warning(res.data.msg);
                this.isJoined = true;
              }
            }
          }).catch(err=>{
            console.log(err);
          })
        }
      }).catch((err)=>{
        console.log(err);
      })
      console.log("apply is OK");
    }
  },
  created() {
    this.TeamId = 2;
    this.getTeamInformation();
  }
}
</script>

<style scoped>
#invitation {
  width: 450px;
  height: 350px;
  background-color: white;
  border: 1px solid;
  border-radius: 5px;
  position: absolute;
  top: 20%;
  left: 37%;
}
</style>