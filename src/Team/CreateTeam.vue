<template>
  <div id="creation">
    <div id="create-header">
      <span>新建团队</span>
    </div>
    <div id="new-name">
      <div>
        <span class="mention">团队名称</span>
      </div>
      <div id="name-input">
        <el-input
            v-model="TeamName"
            autosize
            type="text"
            placeholder="请输入团队名称"
        >
        </el-input>
      </div>
    </div>
    <div id="new-intro">
      <div>
        <span class="mention">团队简介</span>
      </div>
      <div id="intro-input">
        <el-input
            v-model="TeamIntro"
            :autosize="{minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入团队简介"
        >
        </el-input>
      </div>
    </div>
    <div id="remind">
      <div id="remind-words">
        <Warning style="width: 1.2em; height: 1.2em; margin: 15px 5px auto auto"/>
        <span
            style="margin: 13px auto auto 0"
        >
          创建您的团队！
        </span>
      </div>
    </div>
    <el-button
        type="success"
        style="margin: 25px auto auto 260px"
        @click="TryCreate"
    >
      创建团队
    </el-button>
  </div>
</template>

<script>

import {Warning} from "@element-plus/icons"

export default {
  name: "CreateTeam",
  components: {Warning},
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
              this.$router.push();
            }
            else{
              this.$message.error("其他错误！");
            }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
#creation {
  width: 600px;
  height: 600px;
  margin: auto auto auto auto;
  /*border: solid;*/
}

#create-header {
  width: 100%;
  height: 25px;
  font-size: 25px;
  text-align: center;
  margin-top: 50px;
  font-weight: 1000;
  /*border: solid;*/
}

#new-name {
  width: 100%;
  height: 80px;
  margin-top: 20px;
  /*border: solid;*/
  text-align: left;
}

#new-intro {
  width: 100%;
  height: 120px;
  margin-top: 20px;
  /*border: solid;*/
  text-align: left;
}

.mention {
  width: 100%;
  height: 16px;
  font-size: 16px;
  color: #606266;
  margin-left: 70px;
}

#name-input {
  width: 460px;
  margin: 20px auto 0 auto;
}

#intro-input {
  width: 460px;
  margin: 20px auto 0 auto;
}

#remind {
  width: 460px;
  height: 50px;
  margin: 10px auto auto auto;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}

#remind-words {
  display: flex;
}
</style>