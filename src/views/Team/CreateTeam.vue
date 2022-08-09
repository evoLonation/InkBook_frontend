<template>
  <div class="team-create-layout">
    <div class="left-part">
      <div class="logo-and-name">
        <img src="../../assets/logo.png" class="logo" alt="">
      </div>
      <img src="../../assets/Team/新建团队界面试用.png" class="left-pic" alt="">
    </div>
    <div class="right-part">
      <div class="right-container">
        <span class="team-create-in">新建团队</span>
        <div>
          <el-input
            class="my-el-input"
            v-model="TeamName"
            placeholder="请输入团队名称"
          >
            <template #prefix>
              <el-icon class="el-input__icon"><coordinate/></el-icon>
            </template>
          </el-input>
          <el-input
              class="my-el-input"
              v-model="TeamIntro"
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 10 }"
              placeholder="&nbsp;&nbsp;请输入团队简介"
          >
          </el-input>
          <div
              style="width: 100%; display: flex"
          >
            <el-button
                class="my-el-button"
                @click="TryCreate"
            >
              完成创建
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Coordinate} from "@element-plus/icons";
export default {
  name: "CreateTeam",
  components: {Coordinate},
  data(){
    return{
      TeamName: '',
      TeamIntro: '',
      TeamId: '',
    }
  },
  methods: {
    TryCreate: function () {
      // 检查函数是否被调用
      console.log("调用teamCreate");

      // 前端参数检查
      if(this.TeamName === ''){
        this.$message("团队名称不可以为空！");
        return;
      }
      if(this.TeamIntro === ''){
        this.$message("团队简介不可以为空!");
        return;
      }

      console.log(this.$store.state.loginUser.userId);
      console.log(this.TeamName)
      console.log(this.TeamIntro)
      console.log(this.$store.state.loginUser.userId)
      this.$axios.post("team/create",
          {
            "teamName": this.TeamName,
            "teamIntroductory": this.TeamIntro,
            "userId": this.$store.state.loginUser.userId,
          }).then((res) => {
            console.log("进入回调函数");
            console.log(res.data);
            if(res.status === 200){
              this.$message.success(res.data.msg);
              this.TeamId = res.data.teamId;
              this.$router.push({name: "teamList", params: {key: ''}});
            }
            else{
              this.$message.error("其他错误！");
            }
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    }
  }
}
</script>

<style scoped>
.team-create-layout {
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

.team-create-in {
  font-size: 40px;
  line-height: 48px;
  margin-bottom: 32px;
  font-weight: bold;
}

.my-el-input {
  margin: 30px auto 0 0;
}

.my-el-input >>>.el-input__inner {
  font-size: 18px;
  line-height: 23px;
  height: 40px;
}

.my-el-input >>>.el-input__wrapper {
  border-radius: 30px;
}

.my-el-input >>>.el-textarea__inner{
  font-size: 17px;
  border-radius: 20px;
}

.my-el-button {
  width: 150px;
  height: 50px;
  color: gray;
  font-size: 23px;
  line-height: 28px;
  border-radius: 30px;
  background-color: #E2F5F7;
  margin: 30px auto 0 auto;
}

.my-el-button:hover {
  color: lightskyblue;
}
</style>