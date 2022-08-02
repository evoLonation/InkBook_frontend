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
            style="margin-top: 70px; width: 150px"
            @click="JoinTeam"
            v-if="!isJoined"
        >
          同意加入团队
        </el-button>
        <el-button
            type="warning"
            style="margin-top: 70px; width: 150px"
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
          style="width: 350px; height: 30px; margin: 25px auto 0 auto"
        >
        </el-input>
        <el-input
            v-model="UserPassword"
            placeholder="请输入密码"
            style="width: 350px; height: 30px; margin: 25px auto 0 auto"
            show-password
        >
        </el-input>
        <el-button
          type="success"
          style="width: 150px; margin: 25px auto auto auto"
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
      TeamName: 'CTS',
      TeamIntro: 'CTS 很简单的啦 java助教说话又好听',
      TeamImg: require("../../assets/Team/测试头像.jpg"),
      isJoining: false,
      isJoined: false
    }
  },
  methods: {
    JoinTeam: function () {
      this.$message.success("加入团队成功");
      this.isJoined = true;
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
      this.$message.success("登录成功！");
      this.isJoining = true;
    }
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